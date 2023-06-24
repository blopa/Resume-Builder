const path = require('path');
const { promises: fs } = require('fs');
const packageJson = require('./package.json');

const TEMPLATES_PATH = path.resolve(__dirname, 'src/components/ResumeTemplates');
const disabledTemplates = ['Compact', 'VanHack'];
const ignoredPages = ['/Home/'];
const { convertToKebabCase } = require('./src/utils/gatsby-node-helpers');

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
    const { locale } = page.context; // from post content
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

        const templates = await fs.readdir(TEMPLATES_PATH);
        templates
            .filter((template) => !disabledTemplates.includes(template))
            .forEach((template) => {
                pagePath = `/view/${template}`.toLocaleLowerCase();
                matchPath = `${pagePath}/*`;
                myCreatePage(createPage, page, pagePath, matchPath, language);
            });

        return;
    }

    myCreatePage(createPage, page, pagePath, matchPath, language);
};

exports.onCreateWebpackConfig = async ({ plugins, actions }) => {
    const templates = await fs.readdir(TEMPLATES_PATH);

    // TODO this fixes the 'React Refresh Babel' error when NODE_ENV is 'local' for some reason
    if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV = 'development';
    }

    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                TEMPLATES_LIST: JSON.stringify(templates.filter((template) => !disabledTemplates.includes(template))),
                VERSION: JSON.stringify(packageJson.version),
            }),
        ],
    });
};
