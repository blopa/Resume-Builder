import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    subtitle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}));

const Publications = ({
    publications,
}) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return publications.length > 0 && (
        <div className={classes.resumePublications}>
            <Typography
                className={classes.subtitle}
                color="textPrimary"
                variant="body1"
            >
                {intl.formatMessage({ id: 'projects' })}
            </Typography>
            <ul className={classes.publications}>
                {publications.map((publication) => {
                    if (publication?.enabled) {
                        const {
                            name,
                            publisher,
                            releaseDate,
                            website,
                            url,
                            summary,
                        } = publication?.value || {};

                        return (
                            <li key={uuid()}>
                                {name?.enabled && (
                                    <Typography
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {name?.value}
                                    </Typography>
                                )}
                                {summary?.enabled && (
                                    <Typography
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {summary?.value}
                                    </Typography>
                                )}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Publications;
