import { createIntl, createIntlCache } from 'gatsby-plugin-intl';
import en from './en.json';
import ptBr from './pt-br.json';

const translations = [
    {
        locale: 'en',
        messages: en,
    },
    {
        locale: 'pt-br',
        messages: ptBr,
    },
];

const cache = createIntlCache();

const intl = createIntl(...translations, cache);

export default intl;
