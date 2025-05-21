import Mustache from 'mustache';

export const isObject = (obj) => typeof obj === 'object' && obj?.constructor === Object;

export const isObjectEmpty = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export const isObjectNotEmpty = (obj) => isObject(obj) && Object.keys(obj).length > 0;

export const convertToToggleableObject = (
    obj,
    ignoredProperties = ['enableSourceDataDownload', 'coverLetter', 'meta', '$schema', '__translation__']
) => {
    if (!isObject(obj)) {
        return obj;
    }

    const clonedObj = JSON.parse(JSON.stringify(obj));

    // eslint-disable-next-line no-restricted-syntax
    for (const property in clonedObj) {
        // eslint-disable-next-line no-prototype-builtins
        if (clonedObj.hasOwnProperty(property)) {
            if (clonedObj[property]?.length === 0 || ignoredProperties.includes(property)) {
                // eslint-disable-next-line no-param-reassign
                delete clonedObj[property];
            } else {
                let enabled = Boolean(clonedObj[property]);
                if (isObject(clonedObj[property])) { // Use isObject to check before diving deeper
                    enabled = Object.values(clonedObj[property]).some(
                        (value) => isObjectNotEmpty(value) || (Array.isArray(value) ? value.length > 0 : Boolean(value))
                    );
                    // Recursively call with the cloned object's property and ignoredProperties
                    convertToToggleableObject(clonedObj[property], ignoredProperties);
                } else if (Array.isArray(clonedObj[property])) {
                     enabled = clonedObj[property].length > 0;
                     // If it's an array, iterate and call convertToToggleableObject on its elements if they are objects
                     clonedObj[property].forEach((item, index) => {
                        if (isObject(item)) {
                            clonedObj[property][index] = convertToToggleableObject(item, ignoredProperties);
                        }
                     });
                }


                // eslint-disable-next-line no-param-reassign
                clonedObj[property] = {
                    value: clonedObj[property],
                    enabled,
                };
            }
        }
    }

    return clonedObj;
};

export const convertToRegularObject = (
    obj,
    ignoredProperties = ['enableSourceDataDownload', 'coverLetter', '__translation__']
) => {
    if (!isObject(obj)) {
        return obj;
    }

    const clonedObj = JSON.parse(JSON.stringify(obj));

    // eslint-disable-next-line no-restricted-syntax
    for (const property in clonedObj) {
        if (ignoredProperties.includes(property)) {
            // eslint-disable-next-line no-continue
            continue;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (clonedObj.hasOwnProperty(property)) {
            // Check if property exists and has 'enabled'
            if (clonedObj[property] === null || typeof clonedObj[property] !== 'object' || !clonedObj[property].hasOwnProperty('enabled')) {
                 if (isObject(clonedObj[property])) {
                    convertToRegularObject(clonedObj[property], ignoredProperties);
                } else if (Array.isArray(clonedObj[property])) {
                    clonedObj[property] = clonedObj[property].map(item => {
                        if (isObject(item)) {
                            return convertToRegularObject(item, ignoredProperties);
                        }
                        return item;
                    });
                }
                continue;
            }
            
            if (!clonedObj[property].enabled) {
                // eslint-disable-next-line no-param-reassign
                clonedObj[property] = getDefaultValueForVariableType(clonedObj[property].value);
                // eslint-disable-next-line no-continue
                continue;
            }

            // eslint-disable-next-line no-prototype-builtins
            if (isObject(clonedObj[property]) && clonedObj[property].hasOwnProperty('value')) {
                // eslint-disable-next-line no-param-reassign
                clonedObj[property] = clonedObj[property].value;
            }

            if (isObject(clonedObj[property])) {
                convertToRegularObject(clonedObj[property], ignoredProperties);
            } else if (Array.isArray(clonedObj[property])) {
                // eslint-disable-next-line no-param-reassign
                clonedObj[property] = clonedObj[property]
                    .map((value) => { // No filter needed here as we handle enabled above or it's already a regular object
                        if (isObject(value) && value.hasOwnProperty('enabled') && !value.enabled) {
                            return getDefaultValueForVariableType(value.value);
                        }
                        if (isObject(value) && value.hasOwnProperty('value')) {
                           const val = value.value;
                           if(isObject(val)){
                             return convertToRegularObject(val, ignoredProperties);
                           }
                           return val;
                        }
                         if (isObject(value)) {
                            return convertToRegularObject(value, ignoredProperties);
                        }
                        return value;
                    });
            }
        }
    }

    return clonedObj;
};

export const getDefaultValueForVariableType = (variable) => {
    switch (typeof variable) {
        case 'boolean': {
            return false;
        }

        case 'string': {
            return '';
        }

        case 'number': {
            return 0;
        }

        case 'object':
        default: {
            return Array.isArray(variable) ? [] : {};
        }
    }
};

export const capitalize = (string) => {
    if (!string) {
        return '';
    }

    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const varNameToString = (varObj) => Object.keys(varObj)[0];

export const isClient = () => typeof window !== 'undefined';

export const generateCoverLetterObject = (text) => {
    const variables = Mustache.parse(text)
        .filter((v) => v[0] === 'name')
        .map((v) => v[1])
        .reduce((acc, curr) => ({ ...acc, [curr]: curr }), {});

    return {
        enabled: Boolean(isObjectNotEmpty(variables) || text),
        value: {
            text,
            variables,
        },
    };
};

export const generateLlmPromptObject = (text) => {
    return {
        enabled: Boolean(text),
        value: {
            text,
        },
    };
};
