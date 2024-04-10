/* eslint-disable @next/next/next-script-for-ga */
import { DocumentProps } from 'next/dist/shared/lib/utils';
import { Html, Head, Main, NextScript } from 'next/document';
import {
  GG_SCHEMA_FAQ__HOME_PAGE,
  GG_SCHEMA_FAQ__SOLUTIONS_PAGE,
  GG_SCHEMA_FAQ__DISTRIBUTION_PAGE,
  GG_SCHEMA_FAQ__ZP_THERAPEUTICS_PAGE,
  GG_SCHEMA_FAQ__CLINICAL_REACH_PAGE,
  GG_SCHEMA_FAQ__TECHNOLOGY_SOLUTIONS_PAGE,
  GG_SCHEMA_FAQ__PATIENT_SOLUTIONS_PAGE,
  GG_SCHEMA_FAQ__REGULATORY_SERVICES_PAGE,
  GG_SCHEMA_FAQ__SEGMENTS_PAGE,
  GG_SCHEMA_FAQ__PHARMACEUTICALS_PAGE,
  GG_SCHEMA_FAQ__MEDICAL_DEVICES_DIAGNOSTICS_PAGE,
  GG_SCHEMA_FAQ__CONSUMER_HEALTHCARE_PAGE,
  GG_SCHEMA_FAQ__VACCINES_PAGE,
  GG_SCHEMA_FAQ__ANIMAL_HEALTH_PAGE,
  GG_SCHEMA_FAQ__SPECIALTY_CARE_PAGE,
  GG_SCHEMA_ORGANIZATION,
  GG_SCHEMA_LINKS_SEARCHBOX,
} from 'src/constants/socialsConst';

enum EFaqMarkupPages {
  HomePage = '',
  SolutionsPage = 'solutions',
  DistributionPage = 'distribution',
  ZPTherapeuticsPage = 'zp-therapeutics',
  ClinicalReachPage = 'clinical-reach',
  TechnologySolutionsPage = 'technology-solutions',
  PatientSolutionsPage = 'patient-solutions',
  RegulatoryServicesPage = 'patient-solutions',
  SegmentsPage = 'segments',
  PharmaceuticalsPage = 'pharmaceuticals',
  MedicalDevicesDiagnosticsPage = 'medical-devices-diagnostics',
  ConsumerHealthcarePage = 'medical-devices-diagnostics',
  VaccinesPage = 'vaccines',
  AnimalHealthPage = 'animal-health',
  SpecialtyCarePage = 'specialty-care',
}

export default function Document(data: DocumentProps) {
  const { pageProps } = data['__NEXT_DATA__']?.props;
  const fields = pageProps.layoutData?.sitecore?.route?.fields;
  const paths = data['__NEXT_DATA__']?.query?.path || [];

  const seoMarkupFaqScript = (paths: string | string[]): object | null => {
    if (!process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS || !paths?.length) return null;

    const pageEndPath = paths[paths.length - 1];

    if (paths?.length === 1) {
      return GG_SCHEMA_FAQ__HOME_PAGE;
    }
    switch (pageEndPath) {
      case EFaqMarkupPages.SolutionsPage:
        return GG_SCHEMA_FAQ__SOLUTIONS_PAGE;
      case EFaqMarkupPages.DistributionPage:
        return GG_SCHEMA_FAQ__DISTRIBUTION_PAGE;
      case EFaqMarkupPages.ZPTherapeuticsPage:
        return GG_SCHEMA_FAQ__ZP_THERAPEUTICS_PAGE;
      case EFaqMarkupPages.ClinicalReachPage:
        return GG_SCHEMA_FAQ__CLINICAL_REACH_PAGE;
      case EFaqMarkupPages.TechnologySolutionsPage:
        return GG_SCHEMA_FAQ__TECHNOLOGY_SOLUTIONS_PAGE;
      case EFaqMarkupPages.PatientSolutionsPage:
        return GG_SCHEMA_FAQ__PATIENT_SOLUTIONS_PAGE;
      case EFaqMarkupPages.RegulatoryServicesPage:
        return GG_SCHEMA_FAQ__REGULATORY_SERVICES_PAGE;
      case EFaqMarkupPages.SegmentsPage:
        return GG_SCHEMA_FAQ__SEGMENTS_PAGE;
      case EFaqMarkupPages.PharmaceuticalsPage:
        return GG_SCHEMA_FAQ__PHARMACEUTICALS_PAGE;
      case EFaqMarkupPages.MedicalDevicesDiagnosticsPage:
        return GG_SCHEMA_FAQ__MEDICAL_DEVICES_DIAGNOSTICS_PAGE;
      case EFaqMarkupPages.ConsumerHealthcarePage:
        return GG_SCHEMA_FAQ__CONSUMER_HEALTHCARE_PAGE;
      case EFaqMarkupPages.VaccinesPage:
        return GG_SCHEMA_FAQ__VACCINES_PAGE;
      case EFaqMarkupPages.AnimalHealthPage:
        return GG_SCHEMA_FAQ__ANIMAL_HEALTH_PAGE;
      case EFaqMarkupPages.SpecialtyCarePage:
        return GG_SCHEMA_FAQ__SPECIALTY_CARE_PAGE;
      default:
        return null;
    }
  };

  return (
    <Html lang="en">
      <Head>
        {/* SEO tags */}
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}${pageProps.layoutData?.sitecore?.context?.itemPath}`}
        />
        {fields?.Description?.value && (
          <>
            <meta content={fields?.Description?.value} name="description" />
            <meta property="og:description" content={fields?.Description?.value} />
            <meta content={fields?.MetaKeywords?.value} name="keywords" />
          </>
        )}
        {fields?.Image?.value?.src && (
          <>
            <meta property="og:image" content={fields?.Image?.value?.src} />
            <meta property="og:image:url" content={fields?.Image?.value?.src} />
            <meta property="og:image:secure_url" content={fields?.Image?.value?.src} />
          </>
        )}
        {fields?.Image?.value?.width && (
          <meta property="og:image:width" content={fields?.Image?.value?.width} />
        )}
        {fields?.Image?.value?.height && (
          <meta property="og:image:height" content={fields?.Image?.value?.height} />
        )}
        {fields?.Image?.value?.alt && (
          <meta property="og:image:alt" content={fields?.Image?.value?.alt} />
        )}

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NHB97CK');
            `,
            }}
          />
        ) : (
          ''
        )}

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS ? (
          <>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://www.googletagmanager.com/gtag/js?id=G-BVQKYN05X3" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BVQKYN05X3');
            `,
              }}
            />
          </>
        ) : (
          ''
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS ? (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "imx3gx959t");
            `,
            }}
          />
        ) : (
          ''
        )}

        {/* Google schema markup - Corporation */}
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(GG_SCHEMA_ORGANIZATION) }}
          />
        ) : (
          <></>
        )}

        {/* Google schema markup - WebSite */}
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(GG_SCHEMA_LINKS_SEARCHBOX) }}
          />
        ) : (
          <></>
        )}

        {/* Google schema markup - FAQPage */}
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS && !!seoMarkupFaqScript(paths) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seoMarkupFaqScript(paths)) }}
          />
        )}
      </Head>
      <body>
        {process.env.NEXT_PUBLIC_IS_ENABLE_EMBEDED_SCRIPTS ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NHB97CK"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
            }}
          />
        ) : (
          <></>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
