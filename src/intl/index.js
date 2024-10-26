import { createIntl, createIntlCache } from 'gatsby-plugin-react-intl';

import en from './en.json';
import ptBr from './pt-br.json';
import es from './es.json';
import ja from './ja.json';
import de from './de.json';
import ru from './ru.json';
import fr from './fr.json';

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
    {
        locale: 'ja',
        messages: ja,
    },
    {
        locale: 'de',
        messages: de,
    },
    {
        locale: 'ru',
        messages: ru,
    },
    {
        locale: 'fr',
        messages: fr,
    },
];

export default translations.map((translation) => createIntl(translation, createIntlCache()));
