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

export default translations.map(
    (translation) => createIntl(translation, createIntlCache())
);
