import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';
import BulletList from './BulletList';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeEducation: {
        padding: '15px 0',
    },
    courses: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 12px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    degree: {
        fontWeight: 'bold',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    educationWrapper: {
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
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'education' })}
                </SectionTitle>
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

                                const dates = [startDate, endDate].filter(Boolean).join(' - ');
                                // "B.Sc. in Computer Science" — the connector is locale specific
                                const degree =
                                    studyType && area
                                        ? intl.formatMessage({ id: 'degree_in' }, { studyType, area })
                                        : studyType || area;

                                return (
                                    <li
                                        className={classes.educationWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p className={classes.degree}>
                                            {[dates, degree].filter(Boolean).join(' ')}
                                            {degree && institution && ', '}
                                            {url && institution ? <a href={url}>{institution}</a> : institution}
                                        </p>
                                        {score && (
                                            <p className={classes.meta}>
                                                {`${intl.formatMessage({ id: 'score' })}: ${score}`}
                                            </p>
                                        )}
                                        <BulletList items={courses} />
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
