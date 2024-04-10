import { Field, ImageField, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ZpImage from 'components/Common/ZpImage';
import ZpLink from 'components/Common/ZpLink';

type TTabSectionImage = {
  fields: {
    ListItems: {
      id: string;
      url: string;
      name: string;
      displayName: string;
      fields: {
        TabName: Field<string>;
        Title: Field<string>;
        SubTitle: Field<string>;
        Description: Field<string>;
        ButtonText: Field<string>;
        ButtonLink: {
          value: {
            href: string;
            target?: string;
          };
        };
        Image: Field<ImageField>;
      };
    }[];
  };
  params: ComponentParams;
};

const TabSectionImage = (props: TTabSectionImage): JSX.Element => {
  const { fields } = props;
  const listItems = fields?.ListItems;
  const styles = props.params && props.params.Styles ? props.params.Styles : '';

  const wrapperRef = useRef<HTMLImageElement>(null);

  const [selectedTab, setSelectedTab] = useState<string>(listItems?.[0]?.name || '');
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleClickTab = (tabName: string) => {
    setSelectedTab(tabName);
    setShowMobileMenu(false);
  };

  const handleClickMobileBtn = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  if (!fields || !listItems || !listItems?.length) return <></>;

  return (
    <div className={`corp-component component-tab-section-image ${styles}`}>
      <div>
        <div className="zp-corporate-tab-section-inner-component zp-corporate-tabs-component corp-12-col">
          <div className="tabs-mobile-menu">
            <span className="lbl-menu">Menu</span>
            <Image
              width={24}
              height={32}
              ref={wrapperRef}
              className="menu-icon"
              alt="inner page nav menu"
              src="/images/common/menu-white.svg"
              onClick={handleClickMobileBtn}
            />
          </div>
          <ul className={`tabs-list${showMobileMenu ? ' is-show' : ''}`}>
            {listItems.map((item, idx) => (
              <li
                key={idx}
                className={`tab-list-item${selectedTab === item.name ? ' active' : ''}`}
                onClick={() => handleClickTab(item.name)}
              >
                <span>{item.fields.TabName?.value}</span>
              </li>
            ))}
          </ul>
          <div className="tab-content-list">
            {listItems.map((item, idx) => (
              <div
                key={idx}
                className={`tab-content-item${selectedTab === item.name ? ' active' : ''}`}
              >
                <ZpImage image={item.fields.Image} className="tab-content-image" alt="tab image" />
                <div className="content-section">
                  <div className="sub-title">{item.fields.SubTitle?.value}</div>
                  <div className="title">{item.fields.Title?.value}</div>
                  <div className="description">{item.fields.Description?.value}</div>
                  <ZpLink className="cta-link" btnLink={item.fields.ButtonLink}>
                    {item.fields.ButtonText.value}
                  </ZpLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSectionImage;
