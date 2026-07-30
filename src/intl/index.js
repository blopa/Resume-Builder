import { createIntl, createIntlCache } from 'gatsby-plugin-react-intl';

import en from './en.json';
import ptBr from './pt-br.json';
import es from './es.json';
import ja from './ja.json';
import de from './de.json';
import ru from './ru.json';
import fr from './fr.json';

/*
 * The one list of shipped locales. Adding a locale means adding it here, to
 * `gatsby-config.plugins.js`, and to every template's `intl/` folder — nothing
 * else enumerates them.
 */
export const globalMessages = {
    en,
    'pt-br': ptBr,
    es,
    ja,
    de,
    ru,
    fr,
};

export const LOCALES = Object.keys(globalMessages);

export const createIntlFor = (locale, messages) => createIntl({ locale, messages }, createIntlCache());

export default LOCALES.map((locale) => createIntlFor(locale, globalMessages[locale]));
