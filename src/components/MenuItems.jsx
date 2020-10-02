import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from './Link';

const useStyles = makeStyles({
    drawerList: {
        display: 'block',
    },
    menuLink: {
        fontSize: '1.25rem;',
    },
});

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
                        to="/blog"
                        onClick={onItemClick}
                    >
                        <Typography
                            className={classes.menuLink}
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            {intl.formatMessage({ id: 'blog' })}
                        </Typography>
                    </Link>
                </ListItemText>
                <ListItemText inset>
                    <Link
                        to="/projects"
                        onClick={onItemClick}
                    >
                        <Typography
                            className={classes.menuLink}
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            {intl.formatMessage({ id: 'projects_page.title' })}
                        </Typography>
                    </Link>
                </ListItemText>
                <ListItemText inset>
                    <Link
                        to="/photos"
                        onClick={onItemClick}
                    >
                        <Typography
                            className={classes.menuLink}
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            {intl.formatMessage({ id: 'photos' })}
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
                            color="textPrimary"
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
