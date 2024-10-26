import { createIntl, createIntlCache } from 'gatsby-plugin-react-intl';

// local translations
import localEn from './en.json';
import localPtBr from './pt-br.json';
import localEs from './es.json';
import localDe from './de.json';
import localFr from './fr.json';
import localJa from './ja.json';
import localRu from './ru.json';

// global translations
import globalEn from '../../../../intl/en.json';
import globalPtBr from '../../../../intl/pt-br.json';
import globalEs from '../../../../intl/es.json';
import globalDe from '../../../../intl/de.json';
import globalFr from '../../../../intl/fr.json';
import globalJa from '../../../../intl/ja.json';
import globalRu from '../../../../intl/ru.json';

const translations = [
    {
        locale: 'en',
        messages: {
            ...globalEn,
            ...localEn,
        },
    },
    {
        locale: 'pt-br',
        messages: {
            ...globalPtBr,
            ...localPtBr,
        },
    },
    {
        locale: 'es',
        messages: {
            ...globalEs,
            ...localEs,
        },
    },
    {
        locale: 'de',
        messages: {
            ...globalDe,
            ...localDe,
        },
    },
    {
        locale: 'fr',
        messages: {
            ...globalFr,
            ...localFr,
        },
    },
    {
        locale: 'ja',
        messages: {
            ...globalJa,
            ...localJa,
        },
    },
    {
        locale: 'ru',
        messages: {
            ...globalRu,
            ...localRu,
        },
    },
];

export default translations.map((translation) => createIntl(translation, createIntlCache()));
