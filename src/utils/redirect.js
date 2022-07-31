import React from 'react';
import { injectIntl } from 'gatsby-plugin-react-intl';

// Components
import SEO from '../components/SEO';

const Redirect = ({ intl }) => (
    React.createElement(SEO, {
        title: `${intl.formatMessage({ id: 'title' })}`,
        robots: 'noindex, nofollow',
    })
);

export default injectIntl(Redirect);
