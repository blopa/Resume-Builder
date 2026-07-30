import { LOCALES, createIntlFor, globalMessages } from '../../intl';

/**
 * Builds the intl instances a template renders with: the global UI strings for every
 * shipped locale, overridden by the template's own strings. Templates pass their
 * `intl/*.json` files keyed by locale; a locale a template does not translate falls
 * back to the global strings alone.
 */
const buildTemplateIntls = (localMessages = {}) =>
    LOCALES.map((locale) => createIntlFor(locale, { ...globalMessages[locale], ...localMessages[locale] }));

export default buildTemplateIntls;
