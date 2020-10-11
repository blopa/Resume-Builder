/* globals TEMPLATES_LIST */
import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import SEO from '../../components/SEO';

const ResumeViewer = (props) => {
    const intl = useIntl();
    console.log(props);
    const { params } = props;
    const { template } = params;
    const validTemplate = TEMPLATES_LIST.find(
        (templateName) => templateName.toLowerCase() === template.toLowerCase()
    );

    return (
        <div>
            <SEO
                title={intl.formatMessage({ id: 'build_resume' })}
                robots="noindex, nofollow"
            />
            <h1>NOT FOUND BRO</h1>
        </div>
    );
};

export default ResumeViewer;
