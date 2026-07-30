import Mustache from 'mustache';

export const isObject = (obj) => typeof obj === 'object' && obj?.constructor === Object;

export const isObjectEmpty = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export const isObjectNotEmpty = (obj) => isObject(obj) && Object.keys(obj).length > 0;

// TODO make this return a copy of the obj
export const convertToToggleableObject = (
    obj,
    ignoredProperties = ['enableSourceDataDownload', 'coverLetter', 'llmPrompt', 'meta', '$schema', '__translation__']
) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const property in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property)) {
            if (obj[property]?.length === 0 || ignoredProperties.includes(property)) {
                // eslint-disable-next-line no-param-reassign
                delete obj[property];
            } else {
                let enabled = Boolean(obj[property]);
                if (typeof obj[property] === 'object') {
                    enabled = Object.values(obj[property]).some(
                        (value) => isObjectNotEmpty(value) || value?.length > 0
                    );
                    convertToToggleableObject(obj[property]);
                }

                // eslint-disable-next-line no-param-reassign
                obj[property] = {
                    value: obj[property],
                    enabled,
                };
            }
        }
    }

    return obj;
};

// TODO make this return a copy of the obj
export const convertToRegularObject = (
    obj,
    ignoredProperties = ['enableSourceDataDownload', 'coverLetter', 'llmPrompt', 'meta', '$schema', '__translation__']
) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const property in obj) {
        if (ignoredProperties.includes(property)) {
            // eslint-disable-next-line no-continue
            continue;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property)) {
            if (!obj[property].enabled) {
                // eslint-disable-next-line no-param-reassign
                obj[property] = getDefaultValueForVariableType(obj[property].value);
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

export const generateCoverLetterObject = (text = '') => {
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

export const generateLlmPromptObject = (text = '') => {
    return {
        enabled: Boolean(text),
        value: {
            text,
        },
    };
};

/*
 * `coverLetter` and `llmPrompt` are custom attributes that stay out of the
 * toggleable conversion, so nothing applies their `enabled` flag for them.
 * Every consumer must resolve them through here, otherwise a disabled entry
 * still renders (or gets embedded in the downloaded .json).
 * Returns '' when the attribute is missing, empty or toggled off.
 */
export const resolveToggleableText = (toggleable) => (toggleable?.enabled && toggleable?.value?.text) || '';

// Only show a drawer toggle for custom attributes that actually carry text.
export const hasToggleableText = (toggleable) => isObjectNotEmpty(toggleable) && Boolean(toggleable?.value?.text);

// Internal fields remain available for editing and JSON downloads, but must never reach a resume template.
export const omitInternalResumeFields = (resume) => {
    const renderableResume = { ...resume };
    delete renderableResume.careerStory;
    return renderableResume;
};
