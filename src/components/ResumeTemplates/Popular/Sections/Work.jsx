/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles(() => ({
    body: { '& p': { margin: 0 } },
    link: { marginTop: '1px !important' },
    keywords: { marginTop: '1px !important', fontStyle: 'italic' },
}));

const Work = ({ work }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'experience' })}>
            {work.map((item, index) => {
                if (!item) return null;
                const {
                    name,
                    location,
                    description,
                    position,
                    url,
                    startDate,
                    endDate,
                    summary,
                    highlights,
                    keywords,
                } = item;

                return (
                    <Entry
                        key={index}
                        title={name}
                        dates={[startDate, endDate].filter(Boolean).join(' – ')}
                        subtitle={position}
                        location={location}
                    >
                        {url && (
                            <p className={classes.link}>
                                <a href={url}>{toDisplayUrl(url)}</a>
                            </p>
                        )}
                        {summary && <div className={classes.body} dangerouslySetInnerHTML={{ __html: summary }} />}
                        {description && (
                            <div className={classes.body} dangerouslySetInnerHTML={{ __html: description }} />
                        )}
                        <BulletList items={highlights} />
                        {keywords?.length > 0 && (
                            <p className={classes.keywords}>{keywords.filter(Boolean).join(' · ')}</p>
                        )}
                    </Entry>
                );
            })}
        </Section>
    );
};

export default Work;
