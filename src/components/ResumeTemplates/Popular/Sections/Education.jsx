/* eslint-disable react/prop-types, gatsby/use-gatsby-link */
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';

const Education = ({ education }) => {
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'education' })}>
            {education.map((item, index) => {
                if (!item) return null;
                const { institution, url, area, studyType, startDate, endDate, score, courses, location } = item;
                const degree = [studyType, area].filter(Boolean).join(', ');

                return (
                    <Entry
                        key={index}
                        title={url && institution ? <a href={url}>{institution}</a> : institution}
                        dates={[startDate, endDate].filter(Boolean).join(' – ')}
                        subtitle={[degree, score && `${intl.formatMessage({ id: 'score' })}: ${score}`]
                            .filter(Boolean)
                            .join(' · ')}
                        location={location}
                    >
                        <BulletList items={courses} />
                    </Entry>
                );
            })}
        </Section>
    );
};

export default Education;
