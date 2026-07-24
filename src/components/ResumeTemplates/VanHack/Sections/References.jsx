import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeReferences: {
        padding: '15px 0',
    },
    references: {
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
    name: {
        fontWeight: 'bold',
    },
    reference: {
        fontStyle: 'italic',
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    referenceWrapper: {
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
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'references' })}
                </SectionTitle>
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
                                            <div
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
