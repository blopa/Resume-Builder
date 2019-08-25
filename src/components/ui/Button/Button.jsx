import { createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './button.scss';

export default function Button({ component, theme, className, ...others }) {
    const buttonClassName = cx(styles.button, styles[`button--${theme}`], className);
    const props = { ...others, className: buttonClassName };
    return createElement(component, props);
}

Button.defaultProps = {
    component: 'button',
    theme: 'white',
};

Button.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    theme: PropTypes.oneOf(['blue', 'white']),
    className: PropTypes.string,
};
