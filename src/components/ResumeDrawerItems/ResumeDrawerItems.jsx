import { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';
import { cloneDeep } from 'lodash';

// Styles
import style from './resumeDrawerStyles';

// Components
import Awards from './Items/Awards';
import Basics from './Items/Basics';
import Education from './Items/Education';
import Interests from './Items/Interests';
import Languages from './Items/Languages';
import Publications from './Items/Publications';
import Projects from './Items/Projects';
import References from './Items/References';
import Skills from './Items/Skills';
import Volunteer from './Items/Volunteer';
import Work from './Items/Work';
import CoverLetter from './Items/CoverLetter';
import Certificates from './Items/Certificates';
import Download from './Items/Download';
import TemplateSelector from '../TemplateSelector';

// Utils
import { convertToRegularObject, isObjectNotEmpty } from '../../utils/utils';
import { downloadJson } from '../../utils/json-parser';

// Base resume
import baseResume from '../../store/resume.json';

// Actions
import setResumeTemplate from '../../store/actions/setResumeTemplate';

// Hooks
import { useDispatch } from '../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
    actionButtons: {
        display: 'block',
        margin: '10px 10px 10px 0',
    },
    templateSelectorWrapper: {
        borderTop: '1px solid #ddd',
    },
    templateSelector: {
        width: '100%',
        margin: '10px auto',
    },
    templateSelectorTitle: {
        marginTop: '10px',
    },
}));

const ResumeDrawerItems = ({
    toggleableJsonResume,
    toggleableJsonResume: {
        basics,
        work,
        skills,
        education,
        awards,
        volunteer,
        publications,
        languages,
        interests,
        references,
        projects,
        certificates,
        // custom attributes
        coverLetter,
        enableSourceDataDownload = false,
    },
    onClose,
    onPrint,
}) => {
    const classes = useStyles();
    const intl = useIntl();
    const dispatch = useDispatch();

    const printDocument = useCallback(() => {
        window.print();
    }, []);

    const handleDownloadJson = useCallback(() => {
        const jsonResume = {
            ...baseResume,
            ...convertToRegularObject(cloneDeep(toggleableJsonResume)),
            enableSourceDataDownload: toggleableJsonResume.enableSourceDataDownload,
            coverLetter: toggleableJsonResume.coverLetter?.value?.text || '',
            // eslint-disable-next-line no-underscore-dangle
            __translation__: cloneDeep(toggleableJsonResume.__translation__),
        };

        downloadJson(jsonResume);
    }, [toggleableJsonResume]);

    const handleTemplateSelected = useCallback(
        (selectedTemplate) => {
            dispatch(setResumeTemplate(selectedTemplate));
        },
        [dispatch]
    );

    return (
        <div className={classes.resumeDrawerItemsWrapper}>
            <button type="button" onClick={onClose}>
                <CloseIcon />
            </button>
            <div>
                <Button className={classes.actionButtons} variant="contained" color="primary" disabled>
                    {intl.formatMessage({ id: 'download_doc' })}
                </Button>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadJson}
                >
                    {intl.formatMessage({ id: 'download_json' })}
                </Button>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="secondary"
                    onClick={onPrint || printDocument}
                >
                    {intl.formatMessage({ id: 'print' })}
                </Button>
            </div>
            <div className={classes.templateSelectorWrapper}>
                <Typography color="textPrimary" variant="subtitle2" className={classes.templateSelectorTitle}>
                    {intl.formatMessage({ id: 'template' })}
                </Typography>
                <TemplateSelector className={classes.templateSelector} onSelect={handleTemplateSelected} />
            </div>
            {isObjectNotEmpty(coverLetter) && <CoverLetter coverLetter={coverLetter} />}
            <Download enableSourceDataDownload={enableSourceDataDownload} />
            {isObjectNotEmpty(basics) && <Basics basics={basics} />}
            {isObjectNotEmpty(work) && <Work work={work} />}
            {isObjectNotEmpty(skills) && <Skills skills={skills} />}
            {isObjectNotEmpty(education) && <Education education={education} />}
            {isObjectNotEmpty(awards) && <Awards awards={awards} />}
            {isObjectNotEmpty(volunteer) && <Volunteer volunteer={volunteer} />}
            {isObjectNotEmpty(publications) && <Publications publications={publications} />}
            {isObjectNotEmpty(certificates) && <Certificates certificates={certificates} />}
            {isObjectNotEmpty(projects) && <Projects projects={projects} />}
            {isObjectNotEmpty(languages) && <Languages languages={languages} />}
            {isObjectNotEmpty(interests) && <Interests interests={interests} />}
            {isObjectNotEmpty(references) && <References references={references} />}
        </div>
    );
};

export default ResumeDrawerItems;
