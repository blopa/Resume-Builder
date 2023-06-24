import { createIntl, createIntlCache } from 'gatsby-plugin-react-intl';

// local translations
import localEn from './en.json';
import localPtBr from './pt-br.json';
import localEs from './es.json';

// global translations
import globalEn from '../../../../intl/en.json';
import globalPtBr from '../../../../intl/pt-br.json';
import globalEs from '../../../../intl/es.json';

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
];

export default translations.map((translation) => createIntl(translation, createIntlCache()));
