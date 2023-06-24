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
    plugins: [],
};
