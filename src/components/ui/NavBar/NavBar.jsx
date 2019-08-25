import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { MemoryRouter as Router } from 'react-router';
import NavBarItem from './NavBarItem';

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
                <List
                    component="nav"
                    className={style['navbar-list']}
                >
                    <NavBarItem
                        to=""
                        title="Home"
                    />
                    <NavBarItem
                        to="upload"
                        title="Build"
                    />
                    <NavBarItem
                        to="contact"
                        title="Contact"
                    />
                </List>
            </Toolbar>
        </AppBar>
    </Router>
);

export default NavBar;
