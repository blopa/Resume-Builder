import { createIntl, createIntlCache } from 'gatsby-plugin-intl';
import en from './en.json';
import ptBr from './pt-br.json';
import es from './es.json';

const translations = [
    {
        locale: 'en',
        messages: en,
    },
    {
        locale: 'pt-br',
        messages: ptBr,
    },
    {
        locale: 'es',
        messages: es,
    },
];

export default translations.map(
    (translation) => createIntl(translation, createIntlCache())
);
