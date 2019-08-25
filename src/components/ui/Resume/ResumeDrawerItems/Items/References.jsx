import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeReferences from '../../../../../store/actions/setResumeReferences';
import { varNameToString } from '../../../../../utils/utils';
import style from '../resume-drawer-items.scss';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeReferences: (references) => {
        dispatch(setResumeReferences(references));
    },
});

class References extends Component {
    toggleReferences = () => {
        const currentState = this.props.references.enabled;
        this.props.setResumeReferences({
            ...this.props.references,
            enabled: !currentState,
        });
    };

    toggleReference = (reference) => {
        const newReferences = { ...this.props.references };
        newReferences.value =
            newReferences.value.map((ref) => {
                if (JSON.stringify(ref.value) === JSON.stringify(reference.value)) {
                    return {
                        ...ref,
                        enabled: !ref.enabled,
                    };
                } else {
                    return ref;
                }
            });
        this.props.setResumeReferences(newReferences);
    };

    toggleReferencesDetail = (reference, propName) => {
        const newReferences = { ...this.props.references };
        newReferences.value =
            newReferences.value.map((ref) => {
                if (JSON.stringify(ref.value) === JSON.stringify(reference.value)) {
                    return {
                        ...ref,
                        value: {
                            ...ref.value,
                            [propName]: {
                                ...ref.value[propName],
                                enabled: !ref.value[propName].enabled,
                            },
                        },
                    };
                } else {
                    return ref;
                }
            });
        this.props.setResumeReferences(newReferences);
    };

    render() {
        const { references } = this.props;
        return (
            <div className={style['resume-drawer-items--item']}>
                <ItemInput
                    label="references"
                    onChange={this.toggleReferences}
                    checked={references.enabled}
                />
                {references.enabled && (
                    <ul>
                        {references.value.map((ref) => {
                            const {
                                name,
                                reference,
                            } = ref.value;
                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={name.value}
                                        checked={ref.enabled}
                                        onClick={() => this.toggleReference(ref)}
                                    />
                                    {ref.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name.enabled}
                                                onClick={() => this.toggleReferencesDetail(
                                                    ref,
                                                    varNameToString({ name })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ reference })}
                                                checked={reference.enabled}
                                                onClick={() => this.toggleReferencesDetail(
                                                    ref,
                                                    varNameToString({ reference })
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

export default connect(null, mapDispatchToProps)(References);
