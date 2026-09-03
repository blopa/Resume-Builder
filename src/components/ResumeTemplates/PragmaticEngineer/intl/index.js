/* eslint-disable gatsby/no-import-json */
import buildTemplateIntls from '../../../ResumeTemplateShell/buildTemplateIntls';

import en from './en.json';
import ptBr from './pt-br.json';
import es from './es.json';
import ja from './ja.json';
import de from './de.json';
import ru from './ru.json';
import fr from './fr.json';

export default buildTemplateIntls({ en, 'pt-br': ptBr, es, ja, de, ru, fr });
