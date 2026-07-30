import { Suspense, lazy, useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import { navigate, useIntl } from 'gatsby-plugin-react-intl';
import { v4 as uuid } from 'uuid';

// Components
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import A4Container from '../components/A4Container';
import ResumeDrawerItems from '../components/ResumeDrawerItems/ResumeDrawerItems';
import FloatingButton from '../components/FloatingButton';

// Hooks
import { useSelector } from '../store/StoreProvider';

// Utils
import { isObjectNotEmpty } from '../utils/utils';
import { toExportableResume, toRenderableResume } from '../utils/resume-payload';

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
        VanHack: import('../components/ResumeTemplates/VanHack/Index'),
        Compact: import('../components/ResumeTemplates/Compact/Index'),
    };

    return lazy(() => {
        return templates[template];
    });
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

            setResumeTemplate([
                <Template
                    key={uuid()}
                    // eslint-disable-next-line no-underscore-dangle
                    customTranslations={toggleableJsonResume.__translation__}
                    jsonResume={toRenderableResume(toggleableJsonResume)}
                    downloadableResume={toExportableResume(toggleableJsonResume)}
                    coverLetterVariables={toggleableJsonResume.coverLetter?.value?.variables || {}}
                />,
            ]);
        }

        loadTemplate();
        // `isPrinting` is a dependency on purpose even though no template reads it:
        // entering print mode rebuilds the template so the anti-page-break sections
        // re-measure against the print layout.
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
