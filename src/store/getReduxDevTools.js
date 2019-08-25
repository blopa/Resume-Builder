export default function getReduxDevTools() {
    const devtoolsEnabled =
        process.env.NODE_ENV === 'development' && typeof global.devToolsExtension === 'function';
    return devtoolsEnabled ? global.devToolsExtension() : (f) => f;
}
