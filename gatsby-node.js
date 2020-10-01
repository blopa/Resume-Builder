const ignoredPages = ['/Home/'];

exports.onCreatePage = ({ page, actions }) => {
    const { deletePage } = actions;

    // remove the HomePage otherwise we would end up with 2 HomePages
    // one for Home.jsx and another one for index.js
    if (ignoredPages.includes(page.path)) {
        deletePage(page);
    }
};
