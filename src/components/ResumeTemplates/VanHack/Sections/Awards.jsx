import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeAwards: {
        padding: '15px 0',
    },
    awards: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 12px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    award: {
        fontWeight: 'bold',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    awardWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Awards = ({ awards }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        awards?.length > 0 && (
            <div className={classes.resumeAwards}>
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'awards' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.awards}>
                        {awards.map((award) => {
                            if (award) {
                                const { title, date, awarder, summary } = award || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                const meta = [date, awarder].filter(Boolean).join(' - ');

                                return (
                                    <li
                                        className={classes.awardWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p>
                                            {title && <span className={classes.award}>{title}</span>}
                                            {meta && (
                                                <span className={classes.meta}>
                                                    {title && ' - '}
                                                    {meta}
                                                </span>
                                            )}
                                        </p>
                                        {summary && <div dangerouslySetInnerHTML={{ __html: summary }} />}
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default Awards;
