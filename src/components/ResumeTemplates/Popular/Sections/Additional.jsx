/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';
import getAdditionalEntryViewModel from '../../../ResumeTemplateShell/getAdditionalEntryViewModel';

const useStyles = makeStyles(() => ({ body: { '& p': { margin: 0 } } }));

const Additional = ({ type, items }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: type })}>
            {items.map((item, index) => {
                const entry = getAdditionalEntryViewModel(type, item);

                if (!entry) return null;

                const { title, url, date, startDate, endDate, subtitle, body, bullets, details } = entry;
                const dates = date || [startDate, endDate].filter(Boolean).join(' – ');

                return (
                    <Entry
                        key={index}
                        title={url && title ? <a href={url}>{title}</a> : title}
                        dates={dates}
                        subtitle={subtitle}
                    >
                        {body && <div className={classes.body} dangerouslySetInnerHTML={{ __html: body }} />}
                        <BulletList items={bullets} />
                        {details?.length > 0 && <p>{details.filter(Boolean).join(', ')}</p>}
                    </Entry>
                );
            })}
        </Section>
    );
};

export default Additional;
