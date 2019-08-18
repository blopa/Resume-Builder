import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

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
                <List component="nav">
                    <ListItem component="div">
                        <ListItemText inset>
                            <Typography
                                variant="inherit"
                                color="inherit"
                            >
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    color="inherit"
                                >
                                    Home
                                </Link>
                            </Typography>
                        </ListItemText>
                        <ListItemText inset>
                            <Typography
                                variant="inherit"
                                color="inherit"
                            >
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    color="inherit"
                                >
                                    Posts
                                </Link>
                            </Typography>
                        </ListItemText>
                        <ListItemText inset>
                            <Typography
                                variant="inherit"
                                color="inherit"
                            >
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    color="inherit"
                                >
                                    Contact
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Toolbar>
        </AppBar>
    </Router>
);

export default NavBar;
