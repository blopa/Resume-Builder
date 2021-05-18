import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import { useFormik } from 'formik';

// Components
import CarouselSlide from '../components/CarouselSlide';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

// Hooks
import { useSelector } from '../store/StoreProvider';

// Selector
import { selectResumeTemplate, selectToggleableJsonResume } from '../store/selectors';

const SLIDE_INFO = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
];

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

function Arrow({ direction, clickFunction }) {
    const icon = direction === 'left' ? '<-' : '->';

    return <div onClick={clickFunction}>{icon}</div>;
}

const BuildPage = () => {
    const intl = useIntl();
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const content = SLIDE_INFO[index];
    const numSlides = SLIDE_INFO.length;

    const toggleableJsonResume = useSelector(selectToggleableJsonResume);
    const resumeTemplateName = useSelector(selectResumeTemplate);

    const formik = useFormik({
        initialValues: {},
        validationSchema: () => {
            // TODO
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };

    return (
        <Layout>
            <SEO
                title={intl.formatMessage({ id: 'build_resume' })}
                robots="noindex, nofollow"
            />
            <Arrow
                direction="left"
                clickFunction={() => onArrowClick('left')}
            />
            <Slide
                in={slideIn}
                direction={slideDirection}
            >
                <div>
                    <CarouselSlide content={content} />
                </div>
            </Slide>
            <Arrow
                direction="right"
                clickFunction={() => onArrowClick('right')}
            />
        </Layout>
    );
};

export default BuildPage;
