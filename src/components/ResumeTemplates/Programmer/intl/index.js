/* eslint-disable gatsby/no-import-json */
import buildTemplateIntls from '../../../ResumeTemplateShell/buildTemplateIntls';

import compactEn from '../../Compact/intl/en.json';
import compactPtBr from '../../Compact/intl/pt-br.json';
import compactEs from '../../Compact/intl/es.json';
import compactJa from '../../Compact/intl/ja.json';
import compactDe from '../../Compact/intl/de.json';
import compactRu from '../../Compact/intl/ru.json';
import compactFr from '../../Compact/intl/fr.json';
import en from './en.json';
import ptBr from './pt-br.json';
import es from './es.json';
import ja from './ja.json';
import de from './de.json';
import ru from './ru.json';
import fr from './fr.json';

export default buildTemplateIntls({
    en: { ...compactEn, ...en },
    'pt-br': { ...compactPtBr, ...ptBr },
    es: { ...compactEs, ...es },
    ja: { ...compactJa, ...ja },
    de: { ...compactDe, ...de },
    ru: { ...compactRu, ...ru },
    fr: { ...compactFr, ...fr },
});
