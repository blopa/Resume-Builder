import { useCallback, memo } from 'react';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import VariableInput from './List/VariableInput';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeCoverLetter from '../../../store/actions/setResumeCoverLetter';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

// Utils
import { varNameToString } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function CoverLetter({ coverLetter }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toggleCoverLetter = useCallback(() => {
        const currentState = coverLetter?.enabled;
        dispatch(
            setResumeCoverLetter({
                ...coverLetter,
                enabled: !currentState,
            })
        );
    }, [coverLetter, dispatch]);

    const handleOnInputChanged = useCallback(
        (name) => (event) =>
            dispatch(
                setResumeCoverLetter({
                    ...coverLetter,
                    value: {
                        ...coverLetter.value,
                        variables: {
                            ...coverLetter.value.variables,
                            [name]: event.target.value,
                        },
                    },
                })
            ),
        [coverLetter, dispatch]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label={varNameToString({ coverLetter })}
                onChange={toggleCoverLetter}
                checked={coverLetter?.enabled}
            />
            {Object.entries(coverLetter.value.variables).map((entry) => {
                const [name, value] = entry;
                return <VariableInput key={name} label={name} value={value} onChange={handleOnInputChanged(name)} />;
            })}
        </div>
    );
}

export default memo(CoverLetter);
