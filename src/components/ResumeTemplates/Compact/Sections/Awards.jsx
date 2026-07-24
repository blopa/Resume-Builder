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

const Awards = ({ awards }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        awards?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'awards' })}>
                {awards.map((award) => {
                    if (award) {
                        const { title, date, awarder, summary } = award || {};

                        return (
                            <Entry key={uuid()} title={title} dates={date}>
                                {awarder && <p className={classes.meta}>{awarder}</p>}
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

export default Awards;
