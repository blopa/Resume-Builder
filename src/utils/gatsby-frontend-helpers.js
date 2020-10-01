import {
    LOCALSTORAGE_COOKIE_CONSENT_KEY,
    LOCALSTORAGE_COOKIE_CONSENT_VALUE,
    LOCALSTORAGE_MESSAGE_KEY,
} from './constants';

export const getFormattedDateForLanguage = (ISO8601date, language, dateStyle = 'long') => {
    const date = new Date(ISO8601date);

    return date.toLocaleDateString(language, { dateStyle });
};

export const getYoutubeVideoIdFromVideoUrl = (videoUrl) => {
    const result = videoUrl.match(/d\/(\w+)\?rel=\d+/);
    if (result?.length > 1) {
        return result[1];
    }

    return null;
};

export const generateSeoFriendlyVideoUrl = (videoUrl) => {
    // TODO add other types of videos
    if (videoUrl?.includes?.('youtube.')) {
        const youtubeId = getYoutubeVideoIdFromVideoUrl(videoUrl);
        if (youtubeId) {
            return `https://www.youtube.com/v/${youtubeId}`;
        }
    }

    return '';
};

// example: snackbar_message_key -> your_comment_submitted:success
export const setSnackbarMessage = (message, severity) => {
    localStorage.setItem(
        LOCALSTORAGE_MESSAGE_KEY,
        `${message}:${severity}`
    );
};

export const getSnackbarMessage = () => {
    // because of the SSR
    if (typeof localStorage === 'undefined') {
        return [];
    }

    const messageData = localStorage.getItem(LOCALSTORAGE_MESSAGE_KEY);
    if (messageData) {
        return messageData.split(':');
    }

    return [];
};

export const clearSnackbarMessage = () => {
    localStorage.removeItem(LOCALSTORAGE_MESSAGE_KEY);
};

export const getCookieConsent = () => {
    // because of the SSR
    if (typeof localStorage === 'undefined') {
        return null;
    }

    return localStorage.getItem(LOCALSTORAGE_COOKIE_CONSENT_KEY) === LOCALSTORAGE_COOKIE_CONSENT_VALUE;
};

export const setCookieConsentSeen = () => {
    localStorage.setItem(
        LOCALSTORAGE_COOKIE_CONSENT_KEY,
        LOCALSTORAGE_COOKIE_CONSENT_VALUE
    );
};

export const getCategoryPageUrlPath = (category) => `/blog/${category}`;

export const convertToKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

export const getAlternateLangLinks = (pageContext) =>
    pageContext.intl.languages
        .filter((language) => language !== pageContext.intl.language)
        .map((language) => {
            let path;
            if (pageContext.otherLanguagesUrl?.length) {
                path = pageContext.otherLanguagesUrl
                    .find((p) => p.startsWith(`/${language}/`));

                if (!path) {
                    return {};
                }
            } else {
                path = `/${language}${pageContext.intl.originalPath}`;
            }

            return {
                href: path,
                hreflang: language,
                rel: 'alternate',
            };
        });
