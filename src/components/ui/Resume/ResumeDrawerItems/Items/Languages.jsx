import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeLanguages from '../../../../../store/actions/setResumeLanguages';
import { varNameToString } from '../../../../../utils/utils';
import style from '../resume-drawer-items.scss';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeLanguages: (languages) => {
        dispatch(setResumeLanguages(languages));
    },
});

class Languages extends Component {
    toggleLanguages = () => {
        const currentState = this.props.languages.enabled;
        this.props.setResumeLanguages({
            ...this.props.languages,
            enabled: !currentState,
        });
    };

    toggleLanguage = (language) => {
        const newLanguages = { ...this.props.languages };
        newLanguages.value =
            newLanguages.value.map((lang) => {
                if (JSON.stringify(lang.value) === JSON.stringify(language.value)) {
                    return {
                        ...lang,
                        enabled: !lang.enabled,
                    };
                } else {
                    return lang;
                }
            });
        this.props.setResumeLanguages(newLanguages);
    };

    toggleLanguagesDetail = (language, propName) => {
        const newLanguages = { ...this.props.languages };
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
                } else {
                    return lang;
                }
            });
        this.props.setResumeLanguages(newLanguages);
    };

    render() {
        const { languages } = this.props;
        return (
            <div className={style['resume-drawer-items--item']}>
                <ItemInput
                    label="languages"
                    onChange={this.toggleLanguages}
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
                                        onClick={() => this.toggleLanguage(lang)}
                                    />
                                    {lang.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ language })}
                                                checked={language.enabled}
                                                onClick={() => this.toggleLanguagesDetail(
                                                    lang,
                                                    varNameToString({ language })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ fluency })}
                                                checked={fluency.enabled}
                                                onClick={() => this.toggleLanguagesDetail(
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
}

export default connect(null, mapDispatchToProps)(Languages);
