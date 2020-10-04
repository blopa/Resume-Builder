import React, { Fragment, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import { CustomMenuContext } from '../store/CustomMenuProvider';
import MenuItems from './MenuItems';
import Link from './Link';
import SiteLogo from './SiteLogo';

const useStyles = makeStyles((theme) => ({
    menuItemsList: {
        width: 250,
    },
    homeMenuLink: {
        margin: '10px',
    },
    drawer: {
        background: theme.palette.primary.main,
    },
    drawerWrapper: {
        '@media print': {
            visibility: 'hidden',
        },
    },
}));

function SiteDrawer() {
    const { isShowingDrawer, setIsShowingDrawer } = useContext(CustomMenuContext);
    const classes = useStyles();
    const closeDrawer = useCallback(() => setIsShowingDrawer(false), []);

    return (
        <div>
            <Fragment key="left">
                <Drawer
                    className={classes.drawerWrapper}
                    anchor="left"
                    open={isShowingDrawer}
                    onClose={closeDrawer}
                    classes={{ paper: classes.drawer }}
                >
                    <div
                        className={classes.homeMenuLink}
                    >
                        <Link
                            to="/"
                            onClick={closeDrawer}
                        >
                            <SiteLogo />
                        </Link>
                    </div>
                    <div
                        className={classes.menuItemsList}
                        role="presentation"
                    >
                        <MenuItems
                            isDrawer
                            onItemClick={closeDrawer}
                        />
                    </div>
                </Drawer>
            </Fragment>
        </div>
    );
}

export default SiteDrawer;
