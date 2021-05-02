import React, { useContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeInterests: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    interests: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    interest: {
        fontWeight: 'bold',
    },
    keywords: {
        flexWrap: 'wrap',
        listStyle: 'none',
        paddingLeft: 0,
        display: 'inline-flex',
        '& li': {
            fontStyle: 'italic',
            margin: '3px 3px 0 0',
            backgroundColor: theme.palette.type === 'dark' ? '#28407b' : '#dae4f4',
            borderRadius: '3px',
            padding: '1px 3px',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    interestWrapper: {
        pageBreakInside: 'avoid',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Interests = ({ interests }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return interests.length > 0 && (
        <div className={classes.resumeInterests}>
            <h3
                ref={sectionTitle}
                className={classes.title}
                style={titleStyle}
            >
                {intl.formatMessage({ id: 'interests' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.interests}>
                    {interests.map((interest, index) => {
                        if (interest?.enabled) {
                            const {
                                name,
                                keywords,
                            } = interest?.value || {};

                            let refProps = {};
                            if (index === 0) {
                                refProps = {
                                    ref: firstItem,
                                };
                            }

                            return (
                                <li
                                    className={classes.interestWrapper}
                                    key={uuid()}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...refProps}
                                >
                                    {name?.enabled && (
                                        <p className={classes.interest}>
                                            {name?.value}
                                        </p>
                                    )}
                                    {keywords?.enabled && (
                                        <ul className={classes.keywords}>
                                            {keywords?.value.map((keyword) =>
                                                keyword?.enabled && (
                                                    <li key={uuid()}>
                                                        {keyword?.value}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
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

export default Interests;
