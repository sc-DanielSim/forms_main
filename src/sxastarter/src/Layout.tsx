/**
 * This Layout is needed for Starter Kit.
 */
import {
  Field,
  HTMLLink,
  LayoutServiceData,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Scripts from 'src/Scripts';
import config from 'temp/config';
import { useSafeSession } from './hooks/useSafeSession';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

const inter = Inter({ subsets: ['latin'] });

const fontTheme = [
  { theme: 'Page-Builder', font: inter },
  {
    theme: 'My-PIC',
    font: {
      className: 'my-pic',
    },
  },
  { theme: 'MyPetronas', font: { className: 'mypetronas' } },
  { theme: 'Innoverse', font: { className: 'innoverse' } },
];

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

interface ComponentRendering {
  params?: {
    ADViewing?: string;
    ADLoginRequired?: string;
  };
  placeholders?: { [key: string]: ComponentRendering[] };
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const faviconPath = sitecoreContext?.site?.name
    ? `${publicUrl}/${sitecoreContext?.site?.name}/favicon.ico`
    : `${publicUrl}/favicon.ico`;
  const _route = JSON.parse(JSON.stringify(route));
  const isLoginRequired =
    checkADLoginRequired(_route.placeholders['headless-main']) ||
    checkADLoginRequired(_route.placeholders['headless-header']);
  const { status } = useSafeSession();
  const [isLoading, setIsLoading] = useState(
    isLoginRequired && sitecoreContext?.pageState !== 'edit'
  );
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        if (
          status === 'unauthenticated' &&
          isLoginRequired &&
          sitecoreContext?.pageState !== 'edit'
        ) {
          // await signIn().catch((error) => {
          //   console.error(error);
          // });
          // If additional token response handling is needed, do it here.
        }
        if (status === 'authenticated') setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    authenticateUser();
  }, [status, isLoginRequired, sitecoreContext?.pageState]);

  function filterComponentsByADViewing(components: ComponentRendering[]): ComponentRendering[] {
    return components.filter((component) => {
      if (component.placeholders) {
        const keys = Object.keys(component.placeholders);
        for (const key of keys) {
          const nestedComponents = component.placeholders[key];
          if (nestedComponents) {
            component.placeholders[key] = filterComponentsByADViewing(nestedComponents);
          }
        }
      }
      return component.params?.ADViewing !== '1';
    });
  }

  function checkADLoginRequired(components: ComponentRendering[]): boolean {
    for (const component of components) {
      if (component.params?.ADLoginRequired === '1') {
        return true;
      }

      if (component.placeholders) {
        const nestedComponentsArrays = Object.values(component.placeholders);
        for (const nestedComponents of nestedComponentsArrays) {
          if (checkADLoginRequired(nestedComponents)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  useEffect(() => {
    if (_route && sitecoreContext?.pageState !== 'edit' && status === 'unauthenticated') {
      Object.keys(_route.placeholders).forEach((placeholderKey) => {
        const placeholderComponents = _route.placeholders[placeholderKey];
        _route.placeholders[placeholderKey] = filterComponentsByADViewing(placeholderComponents);
      });
    }
  }, [status]);

  const themeFont = fontTheme.find(
    (theme) => theme.theme === (sitecoreContext.site?.name ?? 'Page-Builder')
  )?.font.className;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() ?? 'Page'}</title>
        <link rel="icon" href={faviconPath} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      {isLoading ? (
        <div className={'w-100 d-flex flex-column justify-content-center align-items-center'}>
          <div className="loading-mp"></div>
          <p className="text-small">Please wait...</p>
        </div>
      ) : (
        <div className={`${mainClassPageEditing} ${themeFont ?? inter.className}`}>
          <header>
            <div id="header">
              {_route && <Placeholder name="headless-header" rendering={_route} />}
            </div>
          </header>
          <main>
            <div id="content">
              {_route && <Placeholder name="headless-main" rendering={_route} />}
            </div>
          </main>
          <footer>
            <div id="footer">
              {_route && <Placeholder name="headless-footer" rendering={_route} />}
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Layout;
