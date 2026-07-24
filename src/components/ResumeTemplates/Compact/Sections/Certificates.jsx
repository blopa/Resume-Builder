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
}));

const Certificates = ({ certificates }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        certificates?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'certificates' })}>
                {certificates.map((certificate) => {
                    if (certificate) {
                        const { name, date, url, issuer } = certificate || {};

                        return (
                            <Entry key={uuid()} title={url && name ? <a href={url}>{name}</a> : name} dates={date}>
                                {issuer && <p className={classes.meta}>{issuer}</p>}
                            </Entry>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Certificates;
