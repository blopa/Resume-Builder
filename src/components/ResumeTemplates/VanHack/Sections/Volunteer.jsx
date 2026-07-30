import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';
import BulletList from './BulletList';

// Hooks
import useAntiPageBreakSection from '../../../hooks/useAntiPageBreakSection';

const useStyles = makeStyles((theme) => ({
    resumeVolunteer: {
        padding: '15px 0',
    },
    volunteers: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 16px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    position: {
        fontWeight: 'bold',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    summary: {
        whiteSpace: 'break-spaces',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    volunteerWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Volunteer = ({ volunteer: volunteers }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { titleRef, titleStyle, firstItemProps } = useAntiPageBreakSection();

    return (
        volunteers?.length > 0 && (
            <div className={classes.resumeVolunteer}>
                <SectionTitle ref={titleRef} style={titleStyle}>
                    {intl.formatMessage({ id: 'volunteers' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.volunteers}>
                        {volunteers.map((volunteer, index) => {
                            if (volunteer) {
                                const { organization, position, url, startDate, endDate, summary, highlights } =
                                    volunteer || {};

                                const title = [position, organization].filter(Boolean).join(', ');
                                const meta = [startDate, endDate].filter(Boolean).join(' - ');

                                return (
                                    <li
                                        className={classes.volunteerWrapper}
                                        key={index}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...firstItemProps()}
                                    >
                                        <p>
                                            {title && <span className={classes.position}>{title}</span>}
                                            {meta && (
                                                <span className={classes.meta}>
                                                    {title && ' - '}
                                                    {meta}
                                                </span>
                                            )}
                                        </p>
                                        {url && (
                                            <p className={classes.meta}>
                                                <a href={url}>{url}</a>
                                            </p>
                                        )}
                                        {summary && (
                                            <div
                                                className={classes.summary}
                                                dangerouslySetInnerHTML={{ __html: summary }}
                                            />
                                        )}
                                        <BulletList items={highlights} />
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

export default Volunteer;
