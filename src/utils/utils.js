import Mustache from 'mustache';

export const isObject = (obj) =>
    typeof obj === 'object' && obj?.constructor === Object;

export const isObjectEmpty = (obj) =>
    isObject(obj) && Object.keys(obj).length === 0;

export const isObjectNotEmpty = (obj) =>
    isObject(obj) && Object.keys(obj).length > 0;

// TODO make this return a copy of the obj
export const convertToToggleableObject = (
    obj,
    ignoredProperties = [
        'enableSourceDataDownload',
        'coverLetter',
        'meta',
        '$schema',
        '__translation__',
    ]
) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const property in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property)) {
            if (obj[property]?.length === 0 || ignoredProperties.includes(property)) {
                // eslint-disable-next-line no-param-reassign
                delete obj[property];
            } else {
                if (typeof obj[property] === 'object') {
                    convertToToggleableObject(obj[property]);
                }

                // eslint-disable-next-line no-param-reassign
                obj[property] = {
                    value: obj[property],
                    enabled: true,
                };
            }

        }
    }

    return obj;
};

// TODO make this return a copy of the obj
export const convertToRegularObject = (obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const property in obj) {
        if (property === 'enableSourceDataDownload') {
            // eslint-disable-next-line no-continue
            continue;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property)) {
            if (!obj[property].enabled) {
                // eslint-disable-next-line no-param-reassign
                obj[property] = getDefaultValueForVariableType(obj[property]);
                // eslint-disable-next-line no-continue
                continue;
            }

            // eslint-disable-next-line no-prototype-builtins
            if (isObject(obj[property]) && obj[property].hasOwnProperty('value')) {
                // eslint-disable-next-line no-param-reassign
                obj[property] = obj[property].value;
            }

            if (isObject(obj[property])) {
                convertToRegularObject(obj[property]);
            } else if (Array.isArray(obj[property])) {
                // eslint-disable-next-line no-param-reassign
                obj[property] = obj[property]
                    .filter((value) => value.enabled)
                    .map((value) => {
                        if (isObject(value.value)) {
                            convertToRegularObject(value.value);
                        }

                        return value.value;
                    });
            }
        }
    }

    return obj;
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
        .reduce(
            (acc, curr) => ({ ...acc, [curr]: curr }),
            {}
        );

    return {
        enabled: isObjectNotEmpty(variables),
        value: {
            text,
            variables,
        },
    };
};
