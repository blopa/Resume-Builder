import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeEducation: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    type: { fontWeight: 'bold' },
    institution: {},
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    courses: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    coursesDetails: {
        display: 'flex',
        '& ul': {
            margin: '0 0 0 5px',
            padding: '0',
            display: 'flex',
            listStyle: 'none',
            '& li': {
                margin: '0 5px 0 0',
                '&:after': { content: '","' },
                '&:last-child': { '&:after': { content: '""' } },
            },
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    educationWrapper: {
        pageBreakInside: 'avoid',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Education = ({ education: educations }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        educations?.length > 0 && (
            <div className={classes.resumeEducation}>
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'education' })}
                </h3>
                <div className={classes.contentWrapper}>
                    <ul className={classes.courses}>
                        {educations.map((education) => {
                            if (education) {
                                const { institution, url, area, studyType, startDate, endDate, score, courses } =
                                    education || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                return (
                                    <li
                                        className={classes.educationWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p className={classes.type}>
                                            {area}
                                            {area && studyType && ', '}
                                            {studyType}
                                            {(startDate || endDate) && (
                                                <span className={classes.positionDate}>
                                                    {' ('}
                                                    {startDate}
                                                    {startDate && endDate && ' - '}
                                                    {endDate}
                                                    {')'}
                                                </span>
                                            )}
                                        </p>
                                        <p className={classes.institution}>
                                            {url && institution ? <a href={url}>{institution}</a> : institution}
                                            {score && `, score: ${score}`}
                                        </p>
                                        {courses?.length > 0 && (
                                            <div className={classes.coursesDetails}>
                                                <p>Courses: </p>
                                                <ul>
                                                    {courses?.map((course) => course && <li key={uuid()}>{course}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default Education;
