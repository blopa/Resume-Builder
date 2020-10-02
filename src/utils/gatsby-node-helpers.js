// Use a little helper function to remove trailing slashes from paths
exports.removeTrailingSlash = (path) =>
    (path === '/' ? path : path.replace(/\/$/, ''));

exports.localizedSlug = ({ locale, slug }) =>
    (`/${locale}${slug}`);

/*
 * From lodash:
 * https://github.com/lodash/lodash/blob/750067f42d3aa5f927604ece2c6df0ff2b2e9d72/findKey.js
 */
exports.findKey = (object, predicate) => {
    let result;
    if (object == null) {
        return result;
    }

    Object.keys(object).some((key) => {
        const value = object[key];
        if (predicate(value, key, object)) {
            result = key;
            return true;
        }
        return false;
    });

    return result;
};

exports.convertToKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

exports.getBlogPostPath = (slug, category) => {
    /*
     * remove language extension
     * example: "/2015/2015-05-28-new-beginnings.pt-br/"
     * result: "/2015/2015-05-28-new-beginnings"
     */
    const path = slug.split('.')[0];
    /*
     * split into parts
     * example: "/2015/2015-05-28-new-beginnings"
     * result: ["", "2015", "2015-05-28-new-beginnings"]
     */
    const pathParts = path.split('/');
    /*
     * remove date from path
     * example: "2015-05-28-new-beginnings"
     * result: "new-beginnings"
     */
    const pathWithoutDate = pathParts[2].slice(11, pathParts[2].length);
    // const year = pathParts[1];

    return `/blog/${category}/${pathWithoutDate}/`;
};

exports.sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
