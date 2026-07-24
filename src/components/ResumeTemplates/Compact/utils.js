// Links are shown as bare domains — "piedpiper.example.com" rather than
// "http://piedpiper.example.com/" — to keep the contact block on as few lines as possible.
// eslint-disable-next-line import/prefer-default-export
export const toDisplayUrl = (url) => url?.replace(/^https?:\/\//, '').replace(/\/$/, '');
