import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    bullets: {
        margin: '2px 0 0 0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            position: 'relative',
            margin: '0 0 1px 0',
            paddingLeft: '12px',
            // highlights often carry their own line breaks and indentation, keep them
            whiteSpace: 'break-spaces',
            '&:before': {
                content: '"•"',
                position: 'absolute',
                left: '0',
                color: mutedColor(theme),
            },
        },
    },
}));

const BulletList = ({ items }) => {
    const classes = useStyles();

    return (
        items?.length > 0 && (
            <ul className={classes.bullets}>
                {items.map((item) => item && <li key={uuid()} dangerouslySetInnerHTML={{ __html: item }} />)}
            </ul>
        )
    );
};

export default BulletList;
