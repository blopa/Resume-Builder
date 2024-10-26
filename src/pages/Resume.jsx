import { Suspense, lazy, useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import { navigate, useIntl } from 'gatsby-plugin-react-intl';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Base resume
import baseResume from '../store/resume.json';

// Components
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import A4Container from '../components/A4Container';
import ResumeDrawerItems from '../components/ResumeDrawerItems/ResumeDrawerItems';
import FloatingButton from '../components/FloatingButton';

// Hooks
import { useSelector } from '../store/StoreProvider';

// Utils
import { convertToRegularObject, isObjectNotEmpty } from '../utils/utils';

// Selectors
import { selectResumeTemplate, selectToggleableJsonResume } from '../store/selectors';

// Hooks
import useDetectPrint from '../components/hooks/useDetectPrint';

const useStyles = makeStyles((theme) => ({
    resumeWrapper: {
        margin: '10px 0',
    },
    drawerWrapper: {
        '& .MuiPaper-root': {
            zIndex: 1000,
        },
    },
}));

const importTemplate = (template) => {
    const templates = {
        Default: import('../components/ResumeTemplates/Default/Index'),
        // Compact: import('../components/ResumeTemplates/Compact/Index'),
        // VanHack: import('../components/ResumeTemplates/VanHack/Index'),
    };

    return lazy(() => {
        return templates[template];
    });
};

const parseMarkdown = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => parseMarkdown(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (typeof value === 'string' && ['description', 'summary', 'reference', 'coverLetter'].includes(key)) {
            const sanitizedMarkdown = DOMPurify.sanitize(value);
            acc[key] = marked(sanitizedMarkdown);
        } else if (typeof value === 'object') {
            acc[key] = parseMarkdown(value);
        } else {
            acc[key] = value;
        }

        return acc;
    }, {});
};

const ResumePage = () => {
    const intl = useIntl();
    const classes = useStyles();
    const [a4ContainerHeight, setA4ContainerHeight] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [resumeTemplate, setResumeTemplate] = useState([]);
    const refContainer = useRef(null);
    const rerenderRef = useRef(false);
    const toggleableJsonResume = useSelector(selectToggleableJsonResume);
    const resumeTemplateName = useSelector(selectResumeTemplate);
    const hasData = isObjectNotEmpty(toggleableJsonResume);
    const isPrinting = useDetectPrint();

    useEffect(() => {
        if (!hasData) {
            navigate('/');
        }
    }, [hasData]);

    useEffect(() => {
        async function loadTemplate() {
            const Template = await importTemplate(resumeTemplateName);
            const jsonResume = {
                ...baseResume,
                ...convertToRegularObject(cloneDeep(toggleableJsonResume)),
                enableSourceDataDownload: toggleableJsonResume.enableSourceDataDownload,
                coverLetter:
                    toggleableJsonResume.coverLetter?.enabled && (toggleableJsonResume.coverLetter?.value?.text || ''),
                llmPrompt:
                    toggleableJsonResume.llmPrompt?.enabled && (toggleableJsonResume.llmPrompt?.value?.text || ''),
                // eslint-disable-next-line no-underscore-dangle
                __translation__: cloneDeep(toggleableJsonResume.__translation__),
            };

            // Create a new object with parsed markdown content
            const parsedJsonResume = parseMarkdown(jsonResume);

            setResumeTemplate([
                <Template
                    key={uuid()}
                    // eslint-disable-next-line no-underscore-dangle
                    customTranslations={toggleableJsonResume.__translation__}
                    isPrinting={isPrinting}
                    jsonResume={parsedJsonResume}
                    coverLetterVariables={toggleableJsonResume.coverLetter?.value?.variables || []}
                />,
            ]);
        }

        loadTemplate();
    }, [
        isPrinting,
        // eslint-disable-next-line no-underscore-dangle
        toggleableJsonResume.__translation__,
        resumeTemplateName,
        toggleableJsonResume,
    ]);

    const printDocument = useCallback(() => {
        const size = 1122; // roughly A4
        const resumeHeight = refContainer?.current?.clientHeight;
        const ratio = resumeHeight / size;
        if (resumeHeight && ratio > 1) {
            const vhs = Math.ceil(parseFloat(ratio.toFixed(2)));
            setA4ContainerHeight(vhs * 100);
        } else {
            window.print();
        }
    }, [refContainer]);

    useEffect(() => {
        // hack to make the printable page background correct
        if (rerenderRef.current) {
            if (a4ContainerHeight) {
                window.print();
                window.setTimeout(() => {
                    setA4ContainerHeight(null);
                }, 10);
            }
        } else {
            rerenderRef.current = true;
        }
    }, [a4ContainerHeight]);

    return (
        <Layout>
            <SEO title={intl.formatMessage({ id: 'build_resume' })} robots="noindex, nofollow" />
            {hasData && (
                <div className={classes.resumeWrapper}>
                    <FloatingButton onClick={() => setIsDrawerOpen(true)} />
                    <Drawer
                        className={classes.drawerWrapper}
                        anchor="right"
                        variant="persistent"
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        <ResumeDrawerItems
                            toggleableJsonResume={toggleableJsonResume}
                            onClose={() => setIsDrawerOpen(false)}
                            onPrint={printDocument}
                        />
                    </Drawer>
                    <div ref={refContainer}>
                        <A4Container alignCenter={!isDrawerOpen} customHeight={a4ContainerHeight}>
                            <Suspense fallback={intl.formatMessage({ id: 'loading' })}>{resumeTemplate}</Suspense>
                        </A4Container>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ResumePage;
