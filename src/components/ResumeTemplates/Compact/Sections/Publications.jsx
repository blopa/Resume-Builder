import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import Entry from './Entry';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    meta: {
        color: mutedColor(theme),
    },
    body: {
        '& p': {
            margin: '0',
        },
    },
}));

const Publications = ({ publications }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        publications?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'publications' })}>
                {publications.map((publication) => {
                    if (publication) {
                        const { name, publisher, releaseDate, url, summary } = publication || {};

                        return (
                            <Entry
                                key={uuid()}
                                title={url && name ? <a href={url}>{name}</a> : name}
                                dates={releaseDate}
                            >
                                {publisher && <p className={classes.meta}>{publisher}</p>}
                                {summary && (
                                    <div className={classes.body} dangerouslySetInnerHTML={{ __html: summary }} />
                                )}
                            </Entry>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Publications;
