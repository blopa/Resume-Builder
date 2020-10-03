import React from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    resumeLanguages: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    languages: {
        margin: '0',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
}));

const Languages = ({ languages }) => {
    const classes = useStyles();
    return languages.length > 0 && (
        <div className={classes.resumeLanguages}>
            <h3>Languages</h3>
            <ul className={classes.languages}>
                {languages.map((lang) => {
                    if (lang.enabled) {
                        const { language, fluency } = lang.value;
                        return (
                            <li key={uuid()}>
                                <p>
                                    {language?.enabled && language.value}{', '}
                                    {fluency?.enabled && fluency.value}
                                </p>
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Languages;
