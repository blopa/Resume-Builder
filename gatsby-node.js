const path = require('path');
const { promises: fs } = require('fs');
const packageJson = require('./package.json');

const TEMPLATES_PATH = path.resolve(__dirname, 'src/components/ResumeTemplates');
// Intentionally empty for released builds; add incomplete template directory names here.
const disabledTemplates = new Set();
const ignoredPages = ['/Home/'];
const { convertToKebabCase } = require('./src/utils/gatsby-node-helpers');

const getEnabledTemplates = async () => {
    const entries = await fs.readdir(TEMPLATES_PATH, { withFileTypes: true });

    return entries
        .filter((entry) => entry.isDirectory() && !disabledTemplates.has(entry.name)) // eslint-disable-line sonarjs/no-empty-collection
        .map((entry) => entry.name);
};

const myCreatePage = (createPage, page, pagePath, matchPath, language) => {
    createPage({
        ...page,
        path: pagePath,
        matchPath,
        context: {
            ...page.context,
            intl: {
                ...page.context.intl,
                originalPath: convertToKebabCase(page.context.intl.originalPath),
            },
            locale: language,
        },
    });
};

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage, deletePage } = actions;
    const { language } = page.context.intl; // from accessed site
    let matchPath = page.matchPath;
    let pagePath = convertToKebabCase(page.path);
    deletePage(page);

    if (ignoredPages.includes(page.context.intl.originalPath)) {
        return;
    }

    if (page.context.intl.originalPath === '/Build/') {
        matchPath = `${pagePath}*`;
    }

    if (page.context.intl.originalPath === '/ResumeViewer/') {
        if (page.internalComponentName === 'ComponentResumeViewer' && language !== 'en') {
            return;
        }

        const templates = await getEnabledTemplates();
        templates.forEach((template) => {
            pagePath = `/view/${template}`.toLocaleLowerCase();
            matchPath = `${pagePath}/*`;
            myCreatePage(createPage, page, pagePath, matchPath, language);
        });

        return;
    }

    myCreatePage(createPage, page, pagePath, matchPath, language);
};

exports.onCreateWebpackConfig = async ({ plugins, actions }) => {
    const templates = await getEnabledTemplates();

    // TODO this fixes the 'React Refresh Babel' error when NODE_ENV is 'local' for some reason
    if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV = 'development';
    }

    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                TEMPLATES_LIST: JSON.stringify(templates),
                VERSION: JSON.stringify(packageJson.version),
            }),
        ],
    });
};
