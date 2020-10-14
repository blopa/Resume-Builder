const defaultLanguage = 'en';

module.exports = [
    'gatsby-plugin-top-layout',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-eslint',
    'gatsby-plugin-sharp',
    /*
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    'gatsby-plugin-offline',
    /*
     * If you want to use styled components you should add the plugin here.
     * 'gatsby-plugin-styled-components',
     */
    'gatsby-plugin-react-helmet',
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/content/assets`,
            name: 'assets',
        },
    },
    {
        resolve: 'gatsby-plugin-manifest',
        options: {
            name: 'gatsby-starter-default',
            short_name: 'starter',
            start_url: '/',
            background_color: '#663399',
            theme_color: '#663399',
            display: 'minimal-ui',
            icon: 'content/assets/favicon.png', // This path is relative to the root of the site.
        },
    },
    {
        resolve: 'gatsby-plugin-intl',
        options: {
            path: `${__dirname}/src/intl`,
            languages: ['en', 'pt-br', 'es'],
            defaultLanguage,
            redirect: true,
            redirectComponent: require.resolve('./src/utils/redirect.js'),
        },
    },
    {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
            head: false,
            trackingId: 'UA-10504378-9',
            cookieDomain: 'resume-builder.js.org',
        },
    },
    {
        resolve: 'gatsby-plugin-material-ui',
        /*
         * If you want to use styled components, in conjunction to Material-UI, you should:
         * - Change the injection order
         * - Add the plugin
         */
        options: {
            /*
             * stylesProvider: {
             *   injectFirst: true,
             * },
             */
        },
        // 'gatsby-plugin-styled-components',
    },
];
