/* eslint-disable react/prop-types, gatsby/purify-html */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    list: {
        margin: '3px 0 0',
        paddingLeft: '22px',
        '& li': {
            paddingLeft: '1px',
        },
    },
}));

const BulletList = ({ items }) => {
    const classes = useStyles();

    return (
        items?.length > 0 && (
            <ul className={classes.list}>
                {items.map((item, index) => item && <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
            </ul>
        )
    );
};

export default BulletList;
