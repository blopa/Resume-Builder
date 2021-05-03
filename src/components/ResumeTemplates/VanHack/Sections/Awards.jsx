import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeAwards: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    award: { fontWeight: 'bold' },
    awards: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    awardWrapper: {
        pageBreakInside: 'avoid',
    },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Awards = ({ awards }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return awards.length > 0 && (
        <div className={classes.resumeAwards}>
            <h3
                ref={sectionTitle}
                className={classes.title}
                style={titleStyle}
            >
                {intl.formatMessage({ id: 'awards' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.awards}>
                    {awards.map((award) => {
                        if (award?.enabled) {
                            const {
                                title,
                                date,
                                awarder,
                                summary,
                            } = award?.value || {};

                            let refProps = {};
                            if (!firstItem.current) {
                                refProps = {
                                    ref: firstItem,
                                };
                            }

                            return (
                                <li
                                    className={classes.awardWrapper}
                                    key={uuid()}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...refProps}
                                >
                                    <p className={classes.award}>
                                        {title?.enabled && title?.value}
                                        {(date?.enabled && date?.value) && (
                                            <span className={classes.positionDate}>
                                                {` (${date?.value})`}
                                            </span>
                                        )}
                                    </p>
                                    <p>{awarder?.enabled && awarder?.value}</p>
                                    <p>{summary?.enabled && summary?.value}</p>
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Awards;
