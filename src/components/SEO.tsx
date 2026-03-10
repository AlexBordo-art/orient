import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    noindex?: boolean;
    schema?: Record<string, unknown>;
}

const SITE_NAME = 'Ориент Экспресс — Бюро путешествий';
const BASE_URL = 'https://orient-dv.ru';

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    ogType = 'website',
    ogImage,
    noindex = false,
    schema,
}) => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noindex && <meta name="robots" content="noindex,nofollow" />}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="ru_RU" />

            {/* Schema.org JSON-LD */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
