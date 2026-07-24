import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    meta: {
        color: mutedColor(theme),
    },
}));

const Education = ({ education: educations }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        educations?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'education' })}>
                {educations.map((education) => {
                    if (education) {
                        const { institution, url, area, studyType, startDate, endDate, score, courses } =
                            education || {};

                        const title = [studyType, area].filter(Boolean).join(', ');
                        const dates = [startDate, endDate].filter(Boolean).join(' – ');
                        const scoreText = score && `${intl.formatMessage({ id: 'score' })}: ${score}`;
                        const meta = [institution, scoreText].filter(Boolean);

                        return (
                            <Entry key={uuid()} title={title} dates={dates}>
                                {meta.length > 0 && (
                                    <p className={classes.meta}>
                                        {url && institution ? <a href={url}>{institution}</a> : institution}
                                        {institution && scoreText && ' · '}
                                        {scoreText}
                                    </p>
                                )}
                                <BulletList items={courses} />
                            </Entry>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Education;
