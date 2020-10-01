const plugins = require('./gatsby-config.plugins');

const defaultLanguage = 'en';

module.exports = {
    siteMetadata: {
        title: 'Resume Builder',
        author: 'blopa',
        summary: 'some summary for myself',
        defaultLanguage,
        description: 'Resume Builder',
        siteUrl: 'https://resume-builder.js.org/',
        social: {
            twitter: 'thepiratepablo',
        },
    },
    plugins,
};
