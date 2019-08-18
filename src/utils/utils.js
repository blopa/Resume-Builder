export const getPropsFromLocationHistory = (props) =>
    props.history && props.history.location && props.history.location.props || {};
