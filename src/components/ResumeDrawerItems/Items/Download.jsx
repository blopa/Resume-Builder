import { useCallback, memo } from 'react';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setEnableSourceDataDownload from '../../../store/actions/setEnableSourceDataDownload';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

// Utils
import { varNameToString } from '../../../utils/utils';

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
                label={varNameToString({ enableSourceDataDownload })}
                onChange={toggleCoverLetter}
                checked={enableSourceDataDownload}
            />
        </div>
    );
}

export default memo(Download);
