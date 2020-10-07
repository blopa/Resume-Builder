export default {
    resumeDrawerItemsWrapper: {
        marginTop: '76px',
        minWidth: '300px',
        maxWidth: '350px',
        padding: '5px 20px',
        '& ul': { margin: '0', listStyle: 'none', paddingLeft: '25px' },
        '& li': {
            '&::before': {
                content: "'\\2192'",
                position: 'absolute',
                marginLeft: '-20px',
            },
        },
    },
    resumeDrawerItem: {
        padding: '10px 0',
        borderTop: '1px solid #ddd',
        '&:first-child': { borderTop: 'none' },
    },
};
