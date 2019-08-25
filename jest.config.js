module.exports = {
    verbose: true,
    setupTestFrameworkScriptFile: '<rootDir>/enzyme.setup.js',
    moduleFileExtensions: ['js', 'json', 'jsx'],
    moduleNameMapper: { '\\.(css|scss|sass)$': 'identity-obj-proxy' },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transform: {
        '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '^(?!.*\\.(css|scss|sass)$)': 'identity-obj-proxy',
    },
};
