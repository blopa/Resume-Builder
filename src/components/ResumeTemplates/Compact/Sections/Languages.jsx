import { Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    fluency: {
        color: mutedColor(theme),
    },
}));

const Languages = ({ languages }) => {
    const classes = useStyles();
    const intl = useIntl();

    const spokenLanguages = languages?.filter((lang) => lang?.language || lang?.fluency) || [];

    return (
        spokenLanguages.length > 0 && (
            <Section title={intl.formatMessage({ id: 'languages' })}>
                {/* every language shares one line — this template spends no vertical space on lists */}
                <p>
                    {spokenLanguages.map(({ language, fluency }, index) => (
                        <Fragment key={uuid()}>
                            {index > 0 && ' · '}
                            {language}
                            {fluency && <span className={classes.fluency}>{` (${fluency})`}</span>}
                        </Fragment>
                    ))}
                </p>
            </Section>
        )
    );
};

export default Languages;
