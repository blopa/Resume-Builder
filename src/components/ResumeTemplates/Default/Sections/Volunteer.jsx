import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeVolunteer: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    volunteers: {
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
    position: { fontWeight: 'bold' },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    url: {},
    summary: {},
    highlights: {
        '& li': {
            marginBottom: '1px',
            fontStyle: 'italic',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    volunteerWrapper: {
        pageBreakInside: 'avoid',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Volunteer = ({ volunteer: volunteers }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        volunteers?.length > 0 && (
            <div className={classes.resumeVolunteer}>
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'volunteers' })}
                </h3>
                <div className={classes.contentWrapper}>
                    <ul className={classes.volunteers}>
                        {volunteers.map((volunteer) => {
                            if (volunteer) {
                                const { organization, position, url, startDate, endDate, summary, highlights } =
                                    volunteer || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                return (
                                    <li
                                        className={classes.volunteerWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p className={classes.position}>
                                            {position}
                                            {position && organization && ` ${intl.formatMessage({ id: 'at' })} `}
                                            {organization}
                                            {(startDate || endDate) && (
                                                <span className={classes.positionDate}>
                                                    {' ('}
                                                    {startDate}
                                                    {startDate && endDate && ' - '}
                                                    {endDate}
                                                    {')'}
                                                </span>
                                            )}
                                        </p>
                                        <p className={classes.url}>{url && <a href={url}>{url}</a>}</p>
                                        {summary && (
                                            <span
                                                className={classes.summary}
                                                dangerouslySetInnerHTML={{ __html: summary }}
                                            />
                                        )}
                                        {highlights?.length > 0 && (
                                            <ul className={classes.highlights}>
                                                {highlights?.map(
                                                    (highlight) => highlight && <li key={uuid()}>{highlight}</li>
                                                )}
                                            </ul>
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

export default Volunteer;
