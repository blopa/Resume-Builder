import { Fragment } from 'react';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

const Interests = ({ interests }) => {
    const intl = useIntl();

    const named = (interests || [])
        .map((interest) => {
            const { name, keywords } = interest || {};

            return [name, keywords?.filter(Boolean).join(', ')].filter(Boolean).join(': ');
        })
        .filter(Boolean);

    return (
        named.length > 0 && (
            <Section title={intl.formatMessage({ id: 'interests' })}>
                <p>
                    {named.map((text, index) => (
                        <Fragment key={index}>
                            {index > 0 && ' · '}
                            {text}
                        </Fragment>
                    ))}
                </p>
            </Section>
        )
    );
};

export default Interests;
