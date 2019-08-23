import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import HashLink from '../HashLink/HashLink';

const isSelected = (to) => window && window.location.hash === `#/${to}`;

const NavBarItem = (props) => (
    <ListItem
        component="div"
        selected={isSelected(props.to)}
    >
        <Typography
            variant="inherit"
            color="inherit"
        >
            <HashLink to={props.to}>
                {props.title}
            </HashLink>
        </Typography>
    </ListItem>
);

export default NavBarItem;
