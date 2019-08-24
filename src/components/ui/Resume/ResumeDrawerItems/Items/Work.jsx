import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../../../utils/utils';

// Actions
import setResumeWork from '../../../../../store/actions/setResumeWork';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeWork: (work) => {
        dispatch(setResumeWork(work));
    },
});

class Work extends Component {
    toggleWorks = () => {
        const currentState = this.props.work.enabled;
        this.props.setResumeWork({
            ...this.props.work,
            enabled: !currentState,
        });
    };

    toggleWork = (work) => {
        const newWork = { ...this.props.work };
        newWork.value =
            newWork.value.map((wrk) => {
                if (JSON.stringify(wrk.value) === JSON.stringify(work.value)) {
                    return {
                        ...wrk,
                        enabled: !wrk.enabled,
                    };
                } else {
                    return wrk;
                }
            });
        this.props.setResumeWork(newWork);
    };

    toggleWorkDetail = (work, propName) => {
        const newWork = { ...this.props.work };
        newWork.value =
            newWork.value.map((wrk) => {
                if (JSON.stringify(wrk.value) === JSON.stringify(work.value)) {
                    return {
                        ...wrk,
                        value: {
                            ...wrk.value,
                            [propName]: {
                                ...wrk.value[propName],
                                enabled: !wrk.value[propName].enabled,
                            },
                        },
                    };
                } else {
                    return wrk;
                }
            });
        this.props.setResumeWork(newWork);
    };

    toggleWorkHighlights = (work, highlight) => {
        const newWork = { ...this.props.work };
        newWork.value =
            newWork.value.map((wrk) => {
                if (JSON.stringify(wrk.value) === JSON.stringify(work.value)) {
                    return {
                        ...wrk,
                        value: {
                            ...wrk.value,
                            highlights: {
                                ...wrk.value.highlights,
                                value: [
                                    ...wrk.value.highlights.value.map((high) => {
                                        if (JSON.stringify(high.value) === JSON.stringify(highlight.value)) {
                                            return {
                                                ...high,
                                                enabled: !high.enabled,
                                            };
                                        }

                                        return high;
                                    }),
                                ],
                            },
                        },
                    };
                } else {
                    return wrk;
                }
            });
        this.props.setResumeWork(newWork);
    };

    render() {
        const {
            work: {
                enabled: workEnabled,
                value: works,
            },
        } = this.props;

        return (
            <div>
                <ItemInput
                    label="work"
                    onChange={this.toggleWorks}
                    checked={workEnabled}
                />
                {workEnabled && (
                    <ul>
                        {works.map((work) => {
                            const {
                                company,
                                position,
                                website,
                                startDate,
                                endDate,
                                summary,
                                highlights,
                            } = work.value;

                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={company.value}
                                        checked={work.enabled}
                                        onClick={() => this.toggleWork(work)}
                                    />
                                    {work.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ company })}
                                                checked={company.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ company })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ position })}
                                                checked={position.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ position })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ website })}
                                                checked={website.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ website })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ summary })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ highlights })}
                                                checked={highlights.enabled}
                                                onClick={() => this.toggleWorkDetail(
                                                    work,
                                                    varNameToString({ highlights })
                                                )}
                                            />
                                            {highlights.enabled && (
                                                <ul>
                                                    {highlights.value.map((highlight) => (
                                                        <ItemsList
                                                            label={highlight.value}
                                                            key={uuid()}
                                                            checked={highlight.enabled}
                                                            onClick={() => this.toggleWorkHighlights(
                                                                work,
                                                                highlight
                                                            )}
                                                        />
                                                    ))}
                                                </ul>
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
}

export default connect(null, mapDispatchToProps)(Work);
