import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakSection from '../../../hooks/useAntiPageBreakSection';

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
    const { titleRef, titleStyle, firstItemProps } = useAntiPageBreakSection();

    return (
        interests?.length > 0 && (
            <div className={classes.resumeInterests}>
                <SectionTitle ref={titleRef} style={titleStyle}>
                    {intl.formatMessage({ id: 'interests' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.interests}>
                        {interests.map((interest, index) => {
                            if (interest) {
                                const { name, keywords } = interest || {};

                                const keywordsText = keywords?.filter(Boolean).join(', ');

                                return (
                                    <li
                                        key={index}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...firstItemProps()}
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
