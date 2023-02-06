/* eslint-disable react/jsx-props-no-spreading, no-shadow */
import { useMemo } from 'react';
import { Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Utils
import { isClient } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
    linkWrapper: {},
}));

const DownloadJsonLink = ({ className = null, children, json = {}, name = 'object.json' }) => {
    const classes = useStyles();
    const href = useMemo(() => {
        if (isClient()) {
            const base64Data = btoa(unescape(encodeURIComponent(JSON.stringify(json))));
            return `data:application/json;base64,${base64Data}`;
        }

        return '#';
    }, [json]);

    return (
        <Link className={classNames(className, classes.linkWrapper)} href={href} download={name} target="_blank">
            {children}
        </Link>
    );
};

DownloadJsonLink.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    name: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    json: PropTypes.object,
};

export default DownloadJsonLink;
