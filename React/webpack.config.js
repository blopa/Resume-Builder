var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

var config = {
    entry: SRC_DIR + '/app/index.js',
    output: {
        path: DIST_DIR + '/app',
        filename: 'bundle.js',
        publicPath: '/resume_builder/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                include: SRC_DIR,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|ico)$/,
                include: SRC_DIR,
                loader: 'file-loader'
            }
        ]
    }
};

module.exports = config;