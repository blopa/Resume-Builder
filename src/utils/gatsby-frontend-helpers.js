import {
    LOCALSTORAGE_COOKIE_CONSENT_KEY,
    LOCALSTORAGE_COOKIE_CONSENT_VALUE,
    LOCALSTORAGE_MESSAGE_KEY,
} from './constants';

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

export const fetchGithubResumeJson = async (userName) => {
    const url = `https://raw.githubusercontent.com/${userName}/resume.json/main/resume.json`;
    const result = await fetch(url, {
        method: 'GET',
    }).then(async (response) =>
        // eslint-disable-next-line no-return-await
        await response.text());

    // eslint-disable-next-line no-return-await
    return result || '{}';
};

export const isValidJsonString = (jsonString) => {

    if (!(jsonString && typeof jsonString === 'string')) {
        return false;
    }

    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }

};
