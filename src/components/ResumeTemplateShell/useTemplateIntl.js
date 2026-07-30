import { useMemo } from 'react';
import { createIntl, createIntlCache, useIntl } from 'gatsby-plugin-react-intl';

// Utils
import { isObjectNotEmpty } from '../../utils/utils';

/**
 * Resolves the intl instance a template renders with: its own translations for the
 * active locale (falling back to the default locale), with the resume's runtime
 * `__translation__` section-heading overrides layered on top.
 */
const useTemplateIntl = (templateIntls, customTranslations) => {
    const intl = useIntl();

    return useMemo(() => {
        const templateIntl =
            templateIntls.find((tempIntl) => tempIntl.locale === intl.locale) ||
            templateIntls.find((tempIntl) => tempIntl.locale === intl.defaultLocale);

        if (!isObjectNotEmpty(customTranslations)) {
            return templateIntl;
        }

        return createIntl(
            {
                locale: templateIntl.locale,
                messages: {
                    ...templateIntl.messages,
                    ...customTranslations,
                },
            },
            createIntlCache()
        );
    }, [templateIntls, customTranslations, intl.defaultLocale, intl.locale]);
};

export default useTemplateIntl;
