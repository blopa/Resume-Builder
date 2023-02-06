import { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeLanguages from '../../../store/actions/setResumeLanguages';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Languages({ languages }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeLanguagesState = useCallback(
        (newLanguages) => {
            dispatch(setResumeLanguages(newLanguages));
        },
        [dispatch]
    );

    const toggleLanguages = useCallback(() => {
        const currentState = languages?.enabled;
        setResumeLanguagesState({
            ...languages,
            enabled: !currentState,
        });
    }, [languages, setResumeLanguagesState]);

    const toggleLanguage = useCallback(
        (language, index) => () => {
            const newLanguages = { ...languages };
            newLanguages.value[index] = {
                ...newLanguages.value[index],
                enabled: !newLanguages.value[index].enabled,
            };
            setResumeLanguagesState(newLanguages);
        },
        [languages, setResumeLanguagesState]
    );

    const toggleLanguagesDetail = useCallback(
        (language, index, propName) => () => {
            const newLanguages = { ...languages };
            newLanguages.value[index] = {
                ...newLanguages.value[index],
                value: {
                    ...newLanguages.value[index].value,
                    [propName]: {
                        ...newLanguages.value[index].value[propName],
                        enabled: !newLanguages.value[index].value[propName].enabled,
                    },
                },
            };

            if (newLanguages.value[index].enabled) {
                newLanguages.value[index].enabled = Object.entries(newLanguages.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeLanguagesState(newLanguages);
        },
        [languages, setResumeLanguagesState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput label={varNameToString({ languages })} onChange={toggleLanguages} checked={languages?.enabled} />
            {languages?.enabled && (
                <ul>
                    {languages?.value.map((lang, index) => {
                        const { language, fluency } = lang?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {lang && (
                                    <ItemsList
                                        label={language?.value}
                                        checked={lang?.enabled}
                                        onClick={toggleLanguage(lang, index)}
                                    />
                                )}
                                {lang?.enabled && (
                                    <ul>
                                        {language && (
                                            <ItemsList
                                                label={varNameToString({ language })}
                                                checked={language?.enabled}
                                                onClick={toggleLanguagesDetail(
                                                    lang,
                                                    index,
                                                    varNameToString({ language })
                                                )}
                                            />
                                        )}
                                        {fluency && (
                                            <ItemsList
                                                label={varNameToString({ fluency })}
                                                checked={fluency?.enabled}
                                                onClick={toggleLanguagesDetail(
                                                    lang,
                                                    index,
                                                    varNameToString({ fluency })
                                                )}
                                            />
                                        )}
                                    </ul>
                                )}
                            </Fragment>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default memo(Languages);
