import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from './Link';

const useStyles = makeStyles((theme) => ({
    drawerList: {
        display: 'block',
    },
    menuLink: {
        fontSize: '1.25rem;',
        color: theme.palette.primary.contrastText,
    },
}));

function MenuItems({
    isDrawer = false,
    onItemClick = () => {},
}) {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <List
            component="nav"
        >
            <ListItem
                component="div"
                className={classNames({
                    [classes.drawerList]: isDrawer,
                })}
            >
                <ListItemText inset>
                    <Link
                        to="/upload"
                        onClick={onItemClick}
                    >
                        <Typography
                            className={classes.menuLink}
                            variant="subtitle1"
                        >
                            {intl.formatMessage({ id: 'build_resume' })}
                        </Typography>
                    </Link>
                </ListItemText>
                <ListItemText inset>
                    <Link
                        to="/about"
                        onClick={onItemClick}
                    >
                        <Typography
                            className={classes.menuLink}
                            variant="subtitle1"
                        >
                            {intl.formatMessage({ id: 'about' })}
                        </Typography>
                    </Link>
                </ListItemText>
            </ListItem>
        </List>
    );
}

export default MenuItems;
