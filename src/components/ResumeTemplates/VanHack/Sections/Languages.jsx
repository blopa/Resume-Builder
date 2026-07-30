import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakSection from '../../../hooks/useAntiPageBreakSection';

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
    const { titleRef, titleStyle, firstItemRef } = useAntiPageBreakSection();

    const spokenLanguages = languages?.filter((lang) => lang?.language || lang?.fluency) || [];

    return (
        spokenLanguages.length > 0 && (
            <div className={classes.resumeLanguages}>
                <SectionTitle ref={titleRef} style={titleStyle}>
                    {intl.formatMessage({ id: 'languages' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    {/* the design keeps every language on a single comma separated line */}
                    <p ref={firstItemRef}>
                        {spokenLanguages.map(({ language, fluency }, index) => (
                            <Fragment key={index}>
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
