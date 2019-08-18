import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { MemoryRouter as Router } from 'react-router';
import HashLink from '../HashLink/HashLink';

// Styles
import style from './nav-bar.scss';

const NavBar = () => (
    <Router>
        <AppBar
            position="static"
        >
            <Toolbar>
                <Typography
                    variant="inherit"
                    color="inherit"
                >
                    Resume Builder
                </Typography>
                <List component="nav" className={style['navbar-list']}>
                    <ListItem component="div" selected>
                        <Typography
                            variant="inherit"
                            color="inherit"
                        >
                            <HashLink to="">
                                    Home
                            </HashLink>
                        </Typography>
                    </ListItem>
                    <ListItem component="div">
                        <Typography
                            variant="inherit"
                            color="inherit"
                        >
                            <HashLink to="build">
                                    Build
                            </HashLink>
                        </Typography>
                    </ListItem>
                    <ListItem component="div">
                        <Typography
                            variant="inherit"
                            color="inherit"
                        >
                            <HashLink to="contact">
                                    Contact
                            </HashLink>
                        </Typography>
                    </ListItem>
                </List>
            </Toolbar>
        </AppBar>
    </Router>
);

export default NavBar;
