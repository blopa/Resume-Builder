const ignoredPages = ['/Home/'];
const {
    convertToKebabCase,
} = require('./src/utils/gatsby-node-helpers');

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;
    const { locale } = page.context; // from post content
    const { language } = page.context.intl; // from accessed site
    deletePage(page);

    if (ignoredPages.includes(page.context.intl.originalPath)) {
        return;
    }

    console.log('CREATING PAGE:', {
        path: page.path,
        locale: language,
        blogLocale: locale,
    });

    createPage({
        ...page,
        path: convertToKebabCase(page.path),
        context: {
            ...page.context,
            intl: {
                ...page.context.intl,
                originalPath: convertToKebabCase(page.context.intl.originalPath),
            },
            locale: language,
            blogLocale: locale,
        },
    });
};
