export const RESUME_BUILDER_EXTENSION_KEY = 'x-resume-builder';
export const JSON_RESUME_SCHEMA_URL =
    'https://raw.githubusercontent.com/jsonresume/jsonresume.org/refs/heads/master/packages/schema/schema.json';

const LEGACY_EXTENSION_KEYS = [
    'coverLetter',
    'llmPrompt',
    'careerStory',
    '__translation__',
    'enableSourceDataDownload',
];

const hasOwn = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

const preferNamespacedValue = (namespacedExtensions, namespacedKey, resume, legacyKey, defaultValue) => {
    if (hasOwn(namespacedExtensions, namespacedKey)) {
        return namespacedExtensions[namespacedKey];
    }

    if (hasOwn(resume, legacyKey)) {
        return resume[legacyKey];
    }

    return defaultValue;
};

export const getResumeBuilderExtensions = (resume = {}) => {
    const namespacedExtensions = resume[RESUME_BUILDER_EXTENSION_KEY] || {};

    return {
        coverLetter: preferNamespacedValue(namespacedExtensions, 'coverLetter', resume, 'coverLetter', ''),
        llmPrompt: preferNamespacedValue(namespacedExtensions, 'llmPrompt', resume, 'llmPrompt', ''),
        careerStory: preferNamespacedValue(namespacedExtensions, 'careerStory', resume, 'careerStory', ''),
        translations: preferNamespacedValue(namespacedExtensions, 'translations', resume, '__translation__', {}),
        enableSourceDataDownload: preferNamespacedValue(
            namespacedExtensions,
            'enableSourceDataDownload',
            resume,
            'enableSourceDataDownload',
            false
        ),
    };
};

export const omitResumeBuilderExtensions = (resume = {}) => {
    const standardResume = { ...resume };
    delete standardResume[RESUME_BUILDER_EXTENSION_KEY];
    LEGACY_EXTENSION_KEYS.forEach((key) => delete standardResume[key]);
    return standardResume;
};

export const withResumeBuilderExtensions = (resume = {}, extensions = getResumeBuilderExtensions(resume)) => {
    const standardResume = omitResumeBuilderExtensions(resume);

    return {
        ...standardResume,
        $schema: standardResume.$schema || JSON_RESUME_SCHEMA_URL,
        [RESUME_BUILDER_EXTENSION_KEY]: {
            schemaVersion: 1,
            coverLetter: extensions.coverLetter || '',
            llmPrompt: extensions.llmPrompt || '',
            careerStory: extensions.careerStory || '',
            translations: extensions.translations || {},
            enableSourceDataDownload: Boolean(extensions.enableSourceDataDownload),
        },
    };
};
