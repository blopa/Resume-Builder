import React from 'react';
import Link from '@material-ui/core/Link';

const HashLink = (props) => (
    <Link
        component="a"
        href={`#/${props.to}`}
        color="inherit"
    >
        {props.children}
    </Link>
);

export default HashLink;
