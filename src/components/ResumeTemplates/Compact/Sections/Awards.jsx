import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    subtitle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}));

const Awards = ({
    awards,
    className = null,
}) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return awards.length > 0 && (
        <div
            className={classNames(className, classes.resumeAwards)}
        >
            <Typography
                className={classes.subtitle}
                color="textPrimary"
                variant="body1"
            >
                {intl.formatMessage({ id: 'achievements' })}
            </Typography>
            <ul className={classes.awards}>
                {awards.map((award) => {
                    if (award?.enabled) {
                        const {
                            title,
                            date,
                            awarder,
                            summary,
                        } = award?.value || {};

                        return (
                            <li key={uuid()}>
                                lalala
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Awards;
