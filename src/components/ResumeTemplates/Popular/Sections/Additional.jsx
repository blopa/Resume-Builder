/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';

const useStyles = makeStyles(() => ({ body: { '& p': { margin: 0 } } }));

const Additional = ({ type, items }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: type })}>
            {items.map((item, index) => {
                if (!item) return null;
                const title = item.title || item.name || item.organization;
                const url = item.url;
                const dates =
                    item.date || item.releaseDate || [item.startDate, item.endDate].filter(Boolean).join(' – ');
                const subtitle =
                    item.position || item.publisher || item.issuer || item.awarder || item.entity || item.type;
                const body = item.summary || item.description || item.reference;

                return (
                    <Entry
                        key={index}
                        title={url && title ? <a href={url}>{title}</a> : title}
                        dates={dates}
                        subtitle={subtitle}
                    >
                        {body && <div className={classes.body} dangerouslySetInnerHTML={{ __html: body }} />}
                        <BulletList items={item.highlights || item.courses} />
                        {item.keywords?.length > 0 && <p>{item.keywords.filter(Boolean).join(', ')}</p>}
                    </Entry>
                );
            })}
        </Section>
    );
};

export default Additional;
