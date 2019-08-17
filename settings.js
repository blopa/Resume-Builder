const path = require('path');

module.exports = {
    // port where app should be started
    PORT: 3823,

    FAVICONS: {
        logo: path.join(__dirname, './favicon.png'), // image from which favicons will be generated
        background: '#ffeeee', // theme color for mobile browsers
        // type of favicons to generate, WARNING: dramaticly decreases build speed, use wisely
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false,
        },
    },

    PUBLIC_PATH: path.join(__dirname, './public'),
};
