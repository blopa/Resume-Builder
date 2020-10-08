import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

function SEO({
    description,
    lang,
    meta,
    title,
    robots,
    keywords = [],
    ogImage,
}) {
    const { site, baseSiteImage } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        social {
                            twitter
                        }
                    }
                }
                baseSiteImage: file(
                    absolutePath: { regex: "/base_site_image.jpg/" }
                ) {
                    childImageSharp {
                        fixed(width: 1200) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;
    const seoMeta = [
        {
            name: 'viewport',
            content: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
        },
        {
            name: 'description',
            content: metaDescription,
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: metaDescription,
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:creator',
            content: site.siteMetadata.social.twitter,
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: metaDescription,
        },
        {
            name: 'content-language',
            content: lang,
        },
        {
            name: 'article:tag',
            content: keywords.join(', '),
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
    ].concat(meta);

    let seoImage = ogImage;

    if (robots) {
        seoMeta.push({
            property: 'robots',
            content: robots,
        });
    }

    if (!seoImage) {
        const defaultImageSrc = baseSiteImage?.childImageSharp?.fixed?.src;
        if (defaultImageSrc) {
            seoImage = defaultImageSrc;
        }
    }

    if (seoImage) {
        seoMeta.push({
            property: 'og:image',
            content: seoImage,
        });

        seoMeta.push({
            property: 'twitter:image',
            content: seoImage,
        });
    }

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={seoMeta}
        />
    );
}

SEO.defaultProps = {
    lang: 'en',
    meta: [],
    description: '',
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
