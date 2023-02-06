module.exports = {
    presets: [
        [
            'babel-preset-gatsby',
            {
                reactRuntime: 'automatic',
                targets: {
                    esmodules: true,
                },
            },
        ],
    ],
    plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        ['@babel/plugin-proposal-optional-chaining', { loose: false }],
        ['@babel/plugin-proposal-function-bind', { loose: false }],
        ['@babel/plugin-proposal-private-methods', { loose: false }],
        ['@babel/plugin-transform-async-to-generator', { loose: false }],
    ],
};
