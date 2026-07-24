import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeInterests: {
        pageBreakInside: 'avoid',
        padding: '15px 0',
    },
    interests: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 4px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    interest: {
        fontWeight: 'bold',
    },
    contentWrapper: {
        marginTop: '8px',
    },
}));

const Interests = ({ interests }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        interests?.length > 0 && (
            <div className={classes.resumeInterests}>
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'interests' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.interests}>
                        {interests.map((interest) => {
                            if (interest) {
                                const { name, keywords } = interest || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                const keywordsText = keywords?.filter(Boolean).join(', ');

                                return (
                                    <li
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p>
                                            {name && <span className={classes.interest}>{name}</span>}
                                            {name && keywordsText && ': '}
                                            {keywordsText}
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

export default Interests;
