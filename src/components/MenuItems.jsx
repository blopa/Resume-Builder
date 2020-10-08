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
    externalLink: {
        textDecoration: 'none',
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
                    <a
                        className={classes.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/blopa/Resume-Builder"
                    >
                        <Typography
                            className={classes.menuLink}
                            variant="subtitle1"
                        >
                            {intl.formatMessage({ id: 'source_code' })}
                        </Typography>
                    </a>
                </ListItemText>
            </ListItem>
        </List>
    );
}

export default MenuItems;
