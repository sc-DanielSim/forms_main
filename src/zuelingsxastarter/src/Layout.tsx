/**
 * This Layout is needed for Starter Kit.
 */
import { createContext } from 'react';
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import Scripts from 'src/Scripts';
import ReduxProvider from './redux/provider';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  ExploreMoreButtonText?: Field<string>;
  AllCategoriesText?: Field<string>;
  NoResultFoundText?: Field<string>;
}

export type TNewsConfigurationContext = {
  showMoreTxt?: string;
  allOptionTxt?: string;
  noResultFoundTxt?: string;
};

export const NewsConfigurationContext = createContext<TNewsConfigurationContext>({});

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <ReduxProvider>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <div className="container-fluid position-relative zp-corporate-portal p-0" id="wrapper">
          <header id="banner" role="banner" className="zp-corporate-portal-header">
            {route && <Placeholder name="headless-header" rendering={route} />}
          </header>
          <section id="content">
            {/* Add customized context for only news / news listing - to make easier managing news items in admin */}
            <NewsConfigurationContext.Provider
              value={{
                showMoreTxt: (fields.ExploreMoreButtonText?.value as string) || 'Explore more',
                allOptionTxt: (fields.AllCategoriesText?.value as string) || 'All',
                noResultFoundTxt:
                  (fields.NoResultFoundText?.value as string) ||
                  'No results found, try another category',
              }}
            >
              <div>{route && <Placeholder name="headless-main" rendering={route} />}</div>
            </NewsConfigurationContext.Provider>
          </section>
          <footer>
            <div id="footer">
              {route && <Placeholder name="headless-footer" rendering={route} />}
            </div>
          </footer>
        </div>
      </div>
    </ReduxProvider>
  );
};

export default Layout;
