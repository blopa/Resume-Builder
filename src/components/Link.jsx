/* eslint-disable react/jsx-props-no-spreading, no-shadow */
import React, { forwardRef } from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link as IntlLink } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    linkWrapper: {
        // color: '#8da4f7',
        // '&:visited': {
        //     color: '#48578a',
        // },
    },
}));

const Link = (props) => {
    const classes = useStyles();
    // eslint-disable-next-line react/display-name
    const MyLink = forwardRef(
        (props, ref) => <IntlLink innerRef={ref} {...props} />
    );

    return (
        <MuiLink
            {...props}
            className={classNames(
                props.className,
                classes.linkWrapper
            )}
            component={MyLink}
        >
            {props.children}
        </MuiLink>
    );
};

Link.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Link;
