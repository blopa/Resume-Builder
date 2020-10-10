import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

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
}));

const Awards = ({ awards }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return awards.length > 0 && (
        <div className={classes.resumeAwards}>
            <h3>
                {intl.formatMessage({ id: 'awards' })}
            </h3>
            <ul className={classes.awards}>
                {awards.map((award) => {
                    if (award?.enabled) {
                        const { title, date, awarder, summary } = award?.value || {};
                        return (
                            <li key={uuid()}>
                                <p className={classes.award}>
                                    {title?.enabled && title?.value}
                                </p>
                                <p>{awarder?.enabled && awarder?.value}</p>
                                <p>{date?.enabled && date?.value}</p>
                                <p>{summary?.enabled && summary?.value}</p>
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
