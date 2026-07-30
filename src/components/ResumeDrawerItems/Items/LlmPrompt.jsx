import { useCallback, memo } from 'react';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeLlmPrompt from '../../../store/actions/setResumeLlmPrompt';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

// Utils
import { varNameToString } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function LlmPrompt({ llmPrompt }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toggleLlmPrompt = useCallback(() => {
        const currentState = llmPrompt?.enabled;
        dispatch(
            setResumeLlmPrompt({
                ...llmPrompt,
                enabled: !currentState,
            })
        );
    }, [llmPrompt, dispatch]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput label={varNameToString({ llmPrompt })} onChange={toggleLlmPrompt} checked={llmPrompt?.enabled} />
        </div>
    );
}

export default memo(LlmPrompt);
