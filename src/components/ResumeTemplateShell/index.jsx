import { makeStyles } from '@material-ui/core/styles';
import { RawIntlProvider } from 'gatsby-plugin-react-intl';

// Components
import CoverLetter from './CoverLetter';
import Download from './Download';

// Hooks
import useTemplateIntl from './useTemplateIntl';

// Utils
import { hasRenderableResumeContent } from './utils';

const useStyles = makeStyles((theme) => ({
    // Hidden in plain sight: still in the PDF text layer for a machine to read,
    // effectively invisible to a human looking at the page.
    llmPromptText: {
        userSelect: 'none',
        opacity: 0.1,
        float: 'left',
        color: theme.palette.type === 'dark' ? '#424242' : '#ffffff',
    },
}));

/**
 * Everything the resume templates have in common: locale resolution, the optional
 * cover letter page, the source-data download link and the LLM prompt. A template
 * supplies its own wrapper class and renders its sections as `children`, in its own
 * order — that is the only part that actually differs between them.
 *
 * `jsonResume` is the render payload (markdown already turned into HTML);
 * `downloadableResume` is the untouched export payload behind the download link.
 */
const TemplateShell = ({
    className,
    templateIntls,
    customTranslations = {},
    jsonResume,
    downloadableResume,
    coverLetterVariables = {},
    children,
}) => {
    const classes = useStyles();
    const templateIntl = useTemplateIntl(templateIntls, customTranslations);
    const { coverLetter, llmPrompt, enableSourceDataDownload = false } = jsonResume;

    return (
        <RawIntlProvider value={templateIntl}>
            <div className={className}>
                {coverLetter && (
                    <CoverLetter
                        showPageBreak={hasRenderableResumeContent(jsonResume)}
                        coverLetterText={coverLetter}
                        coverLetterVariables={coverLetterVariables}
                    />
                )}
                {enableSourceDataDownload && <Download jsonResume={downloadableResume || jsonResume} />}
                {children}
                {llmPrompt && <p className={classes.llmPromptText}>{llmPrompt}</p>}
            </div>
        </RawIntlProvider>
    );
};

export default TemplateShell;
