import { Fragment, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeLanguages: {
        pageBreakInside: 'avoid',
        padding: '15px 0',
    },
    fluency: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
    },
}));

const Languages = ({ languages }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    const spokenLanguages = languages?.filter((lang) => lang?.language || lang?.fluency) || [];

    return (
        spokenLanguages.length > 0 && (
            <div className={classes.resumeLanguages}>
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'languages' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    {/* the design keeps every language on a single comma separated line */}
                    <p ref={firstItem}>
                        {spokenLanguages.map(({ language, fluency }, index) => (
                            <Fragment key={uuid()}>
                                {index > 0 && ', '}
                                {language}
                                {fluency && <span className={classes.fluency}>{` (${fluency})`}</span>}
                            </Fragment>
                        ))}
                    </p>
                </div>
            </div>
        )
    );
};

export default Languages;
