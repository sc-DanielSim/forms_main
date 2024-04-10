import React, { useEffect, useRef, useState } from 'react';
import { ComponentParams, Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link';

type TNavigationItem = {
  id: string;
  url: string;
  fields: {
    Title: Field<string>;
    Link: LinkField;
  };
};

type TSubNavigation = {
  fields: {
    LablelMenu: Field<string>;
    ListItems?: TNavigationItem[];
  };
  params: ComponentParams;
};

const SubNavigation = (props: TSubNavigation): JSX.Element => {
  const { fields } = props;
  const lablelMenu = fields?.LablelMenu?.value;
  const listItems = fields?.ListItems;
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  const [activeTab, setActiveTab] = useState('');
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

  useEffect(() => {
    const endRoute = router.asPath.slice(router.asPath.lastIndexOf('/') + 1);
    setActiveTab(endRoute);
  }, [router]);

  useEffect(() => {
    function handleClickSubMenu(event: MouseEvent) {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        setDisplayMenu((current) => !current);
      } else {
        setDisplayMenu(false);
      }
    }
    document.addEventListener('mouseup', handleClickSubMenu);
    return () => {
      document.removeEventListener('mouseup', handleClickSubMenu);
    };
  }, []);

  return (
    <div className={`corp-component component-sub-navigation ${styles}`}>
      <div className="inner-page-nav_mobile-menu">
        <span className="lbl-menu">{lablelMenu}</span>
        <svg
          fill="none"
          className="menu-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27 19"
          ref={menuRef}
        >
          <path
            d="M.3 18.3h25.8v-3H.3v3Zm0-7.3h25.8V8H.3v3ZM.3.7v3h25.8v-3H.3Z"
            fill="#005D62"
          ></path>
        </svg>
      </div>
      <ul className={`inner-page-nav-list ${!displayMenu ? '' : 'is-display-menu'} `}>
        {listItems?.map((item) => (
          <li className="inner-page-nav-list-item" key={item.id}>
            <Link
              className={`${
                item.fields.Link?.value.href
                  ?.toLocaleLowerCase()
                  .endsWith(activeTab.toLocaleLowerCase())
                  ? 'active'
                  : ''
              } link-item`}
              href={item.fields.Link.value.href || '/'}
            >
              {item.fields.Title?.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubNavigation;
