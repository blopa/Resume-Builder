const path = require('path');
const { promises: fs } = require('fs');
const packageJson = require('./package.json');

const TEMPLATES_PATH = path.resolve(__dirname, 'src/components/ResumeTemplates');
const disabledTemplates = ['Compact'];
const ignoredPages = ['/Home/'];
const {
    convertToKebabCase,
} = require('./src/utils/gatsby-node-helpers');

const myCreatePage = (
    createPage,
    page,
    pagePath,
    matchPath,
    language
) => {
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

    if (page.context.intl.originalPath === '/ResumeViewer/') {
        const templates = await fs.readdir(TEMPLATES_PATH)
            .filter((template) => !disabledTemplates.includes(template));

        templates.forEach((template) => {
            if (
                page.internalComponentName === 'ComponentResumeViewer'
                && language !== 'en'
            ) {
                return;
            }

            pagePath = `/view/${template}`.toLocaleLowerCase();
            matchPath = `${pagePath}/*`;
            myCreatePage(
                createPage,
                page,
                pagePath,
                matchPath,
                language
            );
        });

        return;
    }

    myCreatePage(
        createPage,
        page,
        pagePath,
        matchPath,
        language
    );
};

exports.onCreateWebpackConfig = async ({
    plugins,
    actions,
}) => {
    const templates = await fs.readdir(TEMPLATES_PATH)
        .filter((template) => !disabledTemplates.includes(template));

    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                TEMPLATES_LIST: JSON.stringify(templates),
                VERSION: JSON.stringify(packageJson.version),
            }),
        ],
    });
};
