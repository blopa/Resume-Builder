import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { CustomMenuContext } from '../themes/CustomMenuProvider';
import MenuItems from './MenuItems';
import Link from './Link';
import SiteLogo from './SiteLogo';

const useStyles = makeStyles({
    menuItemsList: {
        width: 250,
    },
    homeMenuLink: {
        margin: '10px',
    },
});

function SiteDrawer() {
    const { isShowingDrawer, setIsShowingDrawer } = useContext(CustomMenuContext);
    const classes = useStyles();
    const closeDrawer = useCallback(() => setIsShowingDrawer(false), []);

    return (
        <div>
            <React.Fragment key="left">
                <Drawer
                    anchor="left"
                    open={isShowingDrawer}
                    onClose={closeDrawer}
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
            </React.Fragment>
        </div>
    );
}

export default SiteDrawer;
