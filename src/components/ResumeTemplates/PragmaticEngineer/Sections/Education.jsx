/* eslint-disable react/prop-types, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

// Utils
import { secondaryTextColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: 0,
        paddingLeft: '22px',
    },
    item: {
        pageBreakInside: 'avoid',
        paddingLeft: '1px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
    },
    title: {
        fontWeight: 700,
    },
    dates: {
        flex: 'none',
        fontWeight: 700,
        whiteSpace: 'nowrap',
    },
    details: {
        color: secondaryTextColor(theme),
    },
}));

const Education = ({ education = [], certificates = [] }) => {
    const classes = useStyles();
    const intl = useIntl();
    const hasEducation = education?.length > 0;
    const hasCertificates = certificates?.length > 0;
    const title =
        hasEducation && hasCertificates
            ? intl.formatMessage({ id: 'education_and_certifications' })
            : intl.formatMessage({ id: hasEducation ? 'education' : 'certificates' });

    return (
        <Section title={title}>
            <ul className={classes.list}>
                {education.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { institution, url, area, studyType, startDate, endDate, score, courses } = item;
                    const qualification = [studyType, area].filter(Boolean).join(' ');
                    const dates = [startDate, endDate].filter(Boolean).join('—');

                    return (
                        <li className={classes.item} key={`education-${index}`}>
                            <div className={classes.row}>
                                <p>
                                    {qualification && <span className={classes.title}>{qualification}</span>}
                                    {qualification && institution && ', '}
                                    {url && institution ? <a href={url}>{institution}</a> : institution}
                                    {score && `, ${intl.formatMessage({ id: 'score' })}: ${score}`}
                                </p>
                                {dates && <p className={classes.dates}>{dates}</p>}
                            </div>
                            {courses?.length > 0 && (
                                <p className={classes.details}>{courses.filter(Boolean).join(', ')}</p>
                            )}
                        </li>
                    );
                })}
                {certificates.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { name, date, url, issuer } = item;

                    return (
                        <li className={classes.item} key={`certificate-${index}`}>
                            <div className={classes.row}>
                                <p>
                                    <span className={classes.title}>
                                        {url && name ? <a href={url}>{name}</a> : name}
                                    </span>
                                    {name && issuer && ', '}
                                    {issuer}
                                </p>
                                {date && <p className={classes.dates}>{date}</p>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export default Education;
