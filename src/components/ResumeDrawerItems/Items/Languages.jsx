import React, { Fragment, useContext } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import style from '../resumeDrawerStyles';
import setResumeLanguages from '../../../store/actions/setResumeLanguages';
import { varNameToString } from '../../../utils/utils';
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Languages({ languages }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);
    const setResumeLanguagesState = (newLanguages) => {
        dispatch(setResumeLanguages(newLanguages));
    };

    const toggleLanguages = () => {
        const currentState = languages.enabled;
        setResumeLanguagesState({
            ...languages,
            enabled: !currentState,
        });
    };

    const toggleLanguage = (language) => {
        const newLanguages = { ...languages };
        newLanguages.value =
            newLanguages.value.map((lang) => {
                if (JSON.stringify(lang.value) === JSON.stringify(language.value)) {
                    return {
                        ...lang,
                        enabled: !lang.enabled,
                    };
                }
                return lang;
            });
        setResumeLanguagesState(newLanguages);
    };

    const toggleLanguagesDetail = (language, propName) => {
        const newLanguages = { ...languages };
        newLanguages.value =
            newLanguages.value.map((lang) => {
                if (JSON.stringify(lang.value) === JSON.stringify(language.value)) {
                    return {
                        ...lang,
                        value: {
                            ...lang.value,
                            [propName]: {
                                ...lang.value[propName],
                                enabled: !lang.value[propName].enabled,
                            },
                        },
                    };
                }
                return lang;
            });
        setResumeLanguagesState(newLanguages);
    };

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="languages"
                onChange={toggleLanguages}
                checked={languages.enabled}
            />
            {languages.enabled && (
                <ul>
                    {languages.value.map((lang) => {
                        const {
                            language,
                            fluency,
                        } = lang.value;
                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={language.value}
                                    checked={lang.enabled}
                                    onClick={() => toggleLanguage(lang)}
                                />
                                {lang.enabled && (
                                    <ul>
                                        <ItemsList
                                            label={varNameToString({ language })}
                                            checked={language.enabled}
                                            onClick={() => toggleLanguagesDetail(
                                                lang,
                                                varNameToString({ language })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ fluency })}
                                            checked={fluency.enabled}
                                            onClick={() => toggleLanguagesDetail(
                                                lang,
                                                varNameToString({ fluency })
                                            )}
                                        />
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

export default Languages;
