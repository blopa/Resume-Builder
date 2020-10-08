import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Basics from './Sections/Basics';

const useStyles = makeStyles((theme) => ({
    resumeDefaultTemplate: {
        // TODO
    },
}));

const Compact = ({
    resume: {
        basics,
        work,
        skills,
        education,
        awards,
        volunteer,
        publications,
        languages,
        interests,
        references,
    },
}) => {
    const classes = useStyles();
    return (
        <div className={classes.resumeDefaultTemplate}>
            {basics?.enabled && (
                <Basics
                    basics={basics.value}
                />
            )}
        </div>
    );
};

export default Compact;
