import React, { useCallback, memo } from 'react';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setEnableSourceDataDownload from '../../../store/actions/setEnableSourceDataDownload';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Download({ enableSourceDataDownload }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toggleCoverLetter = useCallback(() => {
        dispatch(setEnableSourceDataDownload(!enableSourceDataDownload));
    }, [enableSourceDataDownload, dispatch]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="enableSourceDataDownload"
                onChange={toggleCoverLetter}
                checked={enableSourceDataDownload}
            />
        </div>
    );
}

export default memo(Download);
