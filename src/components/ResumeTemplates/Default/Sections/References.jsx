import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeReferences: {
        padding: '10px 0',
    },
    name: { fontWeight: 'bold' },
    references: {
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
    reference: {
        fontStyle: 'italic',
        textIndent: '15px',
        '&:before': {
            content: '"❝"',
            fontSize: '25px',
            margin: '-8px 0 0 -35px',
            position: 'absolute',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    referenceWrapper: {
        pageBreakInside: 'avoid',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const References = ({ references }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        references?.length > 0 && (
            <div className={classes.resumeReferences}>
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'references' })}
                </h3>
                <div className={classes.contentWrapper}>
                    <ul className={classes.references}>
                        {references.map((ref) => {
                            if (ref) {
                                const { name, reference } = ref || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                return (
                                    <li
                                        className={classes.referenceWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        {name && <p className={classes.name}>{name}</p>}
                                        {reference && (
                                            <span
                                                className={classes.reference}
                                                dangerouslySetInnerHTML={{ __html: reference }}
                                            />
                                        )}
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

export default References;
