import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeLanguages: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    languages: {
        margin: '0',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    languageWrapper: {
        pageBreakInside: 'avoid',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Languages = ({ languages }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        languages?.length > 0 && (
            <div className={classes.resumeLanguages}>
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'languages' })}
                </h3>
                <div className={classes.contentWrapper}>
                    <ul className={classes.languages}>
                        {languages.map((lang) => {
                            if (lang) {
                                const { language, fluency } = lang || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                return (
                                    <li
                                        className={classes.languageWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p>
                                            {language}
                                            {language && fluency && ', '}
                                            {fluency}
                                        </p>
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

export default Languages;
