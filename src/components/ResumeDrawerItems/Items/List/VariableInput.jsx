import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Utils
import { capitalize } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
    inputWrapper: {
        justifyContent: 'space-between',
        display: 'flex',
    },
    inputLabel: {
        marginRight: '10px',
    },
    textInput: {
        // width: '-webkit-fill-available',
        // width: '-moz-available',
        width: 'fill-available',
        maxWidth: '75%',
        minWidth: '35%',
    },
}));

const VariableInput = ({ onChange, value = '', label = '' }) => {
    const id = uuid();
    const classes = useStyles();

    return (
        <div className={classes.inputWrapper}>
            <label className={classes.inputLabel} htmlFor={id}>
                {capitalize(label)}
            </label>
            <input
                className={classes.textInput}
                type="text"
                onChange={onChange}
                id={id}
                placeholder={label}
                value={value}
            />
        </div>
    );
};

export default VariableInput;
