/* eslint-disable react/prop-types, gatsby/purify-html */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    list: {
        margin: '1px 0 0',
        paddingLeft: '21px',
        '& li': { paddingLeft: '1px' },
        '& p': { display: 'inline' },
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
