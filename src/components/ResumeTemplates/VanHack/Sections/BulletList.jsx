import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bullets: {
        margin: '3px 0 0 11px',
        padding: '0',
        listStyle: 'none',
        '& li': {
            position: 'relative',
            margin: '0 0 3px 0',
            paddingLeft: '20px',
            // highlights often carry their own line breaks and indentation, keep them
            whiteSpace: 'break-spaces',
            '&:before': {
                content: '"⇢"',
                position: 'absolute',
                left: '0',
                color: theme.palette.type === 'dark' ? '#8a8a8a' : '#9e9e9e',
            },
        },
    },
}));

const BulletList = ({ items }) => {
    const classes = useStyles();

    return (
        items?.length > 0 && (
            <ul className={classes.bullets}>
                {items.map((item, index) => item && <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
            </ul>
        )
    );
};

export default BulletList;
