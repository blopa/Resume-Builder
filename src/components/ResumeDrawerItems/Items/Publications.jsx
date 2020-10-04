import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import style from '../resumeDrawerStyles';
import setResumePublications from '../../../store/actions/setResumePublications';
import { varNameToString } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumePublications: (publications) => {
        dispatch(setResumePublications(publications));
    },
});

class Publications extends Component {
    togglePublications = () => {
        const currentState = this.props.publications.enabled;
        this.props.setResumePublications({
            ...this.props.publications,
            enabled: !currentState,
        });
    };

    togglePublication = (publication) => {
        const newPublications = { ...this.props.publications };
        newPublications.value =
            newPublications.value.map((pub) => {
                if (JSON.stringify(pub.value) === JSON.stringify(publication.value)) {
                    return {
                        ...pub,
                        enabled: !pub.enabled,
                    };
                }
                return pub;
            });
        this.props.setResumePublications(newPublications);
    };

    togglePublicationsDetail = (publication, propName) => {
        const newPublications = { ...this.props.publications };
        newPublications.value =
            newPublications.value.map((pub) => {
                if (JSON.stringify(pub.value) === JSON.stringify(publication.value)) {
                    return {
                        ...pub,
                        value: {
                            ...pub.value,
                            [propName]: {
                                ...pub.value[propName],
                                enabled: !pub.value[propName].enabled,
                            },
                        },
                    };
                }
                return pub;
            });
        this.props.setResumePublications(newPublications);
    };

    render() {
        const { publications } = this.props;
        return (
            <div className={style.resumeDrawerItem}>
                <ItemInput
                    label="publications"
                    onChange={this.togglePublications}
                    checked={publications.enabled}
                />
                {publications.enabled && (
                    <ul>
                        {publications.value.map((publication) => {
                            const {
                                name,
                                publisher,
                                releaseDate,
                                website,
                                summary,
                            } = publication.value;
                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={name.value}
                                        checked={publication.enabled}
                                        onClick={() => this.togglePublication(publication)}
                                    />
                                    {publication.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name.enabled}
                                                onClick={() => this.togglePublicationsDetail(
                                                    publication,
                                                    varNameToString({ name })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ publisher })}
                                                checked={publisher.enabled}
                                                onClick={() => this.togglePublicationsDetail(
                                                    publication,
                                                    varNameToString({ publisher })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ releaseDate })}
                                                checked={releaseDate.enabled}
                                                onClick={() => this.togglePublicationsDetail(
                                                    publication,
                                                    varNameToString({ releaseDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ website })}
                                                checked={website.enabled}
                                                onClick={() => this.togglePublicationsDetail(
                                                    publication,
                                                    varNameToString({ website })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary.enabled}
                                                onClick={() => this.togglePublicationsDetail(
                                                    publication,
                                                    varNameToString({ summary })
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

export default connect(null, mapDispatchToProps)(Publications);
