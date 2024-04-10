import { Field, ImageField, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import ZpImage from 'components/Common/ZpImage';
import React, { useState, useRef, useEffect } from 'react';
import { ComponentProps } from 'lib/component-props';

type TBasePlaceInfo = {
  id: string;
  url: string;
  name: string;
  displayName: string;
};

type TOfficeItem = TBasePlaceInfo & {
  fields: {
    Name: Field<string>;
    Address: Field<string>;
    Phone1: Field<string>;
    Phone2: Field<string>;
  };
};

type TMarketItem = TBasePlaceInfo & {
  fields: {
    Top: Field<string>;
    Left: Field<string>;
    MarketName: Field<string>;
    Description: Field<string>;
    Opportunities: Field<string>;
    Capabilities: Field<string>;
    ListOffices: TOfficeItem[];
  };
};

type IWorldMap = ComponentProps & {
  fields?: {
    Title: Field<string>;
    DropdownTitle: Field<string>;
    Image: Field<ImageField>;
    ListMarkets: TMarketItem[];
    ShowOffices: Field<boolean>;
  };
};

const WorldMap = (props: IWorldMap): JSX.Element => {
  const { fields } = props;
  const listMarkets = fields?.ListMarkets || [];
  const showOffices = fields?.ShowOffices?.value || false;
  const dropdownTitle = fields?.DropdownTitle?.value || '';
  const styles = props.params?.Styles || '';

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(dropdownTitle);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickDropdown = () => {
    setShowDropdown(true);
  };

  const handleClickDropdownItem = (itemName: string) => {
    setShowDropdown(false);
    setSelectedCountry(itemName);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  if (!fields) {
    return <></>;
  }

  return (
    <>
      <div className={`corp-component component-world-map ${styles}`}>
        <div className="corp-10-col map-content-parent-section">
          <div className="map-content-top-section">
            <div className="map-content-section">
              <ZpImage image={fields.Image} className="img-fluid" />
              <ul className="map-hotspot-list">
                {listMarkets.map((item) => (
                  <li
                    key={item.id}
                    data-ctryname={item.displayName}
                    className={`map-hotspot-point${
                      item.displayName === selectedCountry ? ' selected' : ''
                    }`}
                    style={{
                      top: item.fields.Top.value + '%',
                      left: item.fields.Left.value + '%',
                    }}
                  ></li>
                ))}
              </ul>
            </div>
            <div className="map-country-list-section">
              <h4 className="title">{fields.Title?.value}</h4>
              <div ref={dropdownRef} className="map-country-select" onClick={handleClickDropdown}>
                <span className="select-span">{selectedCountry}</span>
                <Image
                  src="/images/common/dropdown-arrow.svg"
                  className="dropdown-arrow"
                  alt="dropdown carat"
                  width={14}
                  height={7}
                />
              </div>
              <ul className={`map-country-list${showDropdown ? ' is-show' : ''}`}>
                {listMarkets.map((item) => (
                  <li
                    key={item.id}
                    className={`map-country-list-item${
                      item.displayName === selectedCountry ? ' selected' : ''
                    }`}
                    data-ctryname={item.displayName}
                    onClick={() => handleClickDropdownItem(item.displayName)}
                  >
                    {item.displayName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {!showOffices && (
        <div className="zp-corporate-home-map-info-section corp-10-col">
          <div
            className={`map-info-list-section${selectedCountry === dropdownTitle ? ' d-none' : ''}`}
          >
            {listMarkets.map((item, idx) => (
              <div
                key={idx}
                data-ctryname={item.displayName}
                className={`map-info-list-item${
                  item.displayName === selectedCountry ? 'selected' : ''
                }`}
              >
                <div className="description">{item.fields.Description?.value}</div>
                <div className="info-category-list">
                  <JssRichText className="rich-text__content" field={item.fields.Opportunities} />
                  <JssRichText className="rich-text__content" field={item.fields.Capabilities} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showOffices && (
        <div className="zp-corporate-map-info-section zp-corporate-contactus-map-info-section corp-10-col">
          <div className="map-info-list-section">
            {listMarkets.map((item, idx) => (
              <div
                key={idx}
                data-ctryname={item.displayName}
                className={`map-info-list-item${
                  item.displayName === selectedCountry ? ' selected' : ''
                }`}
              >
                <div className="hotspot-info">
                  <div className="solutions-list-section">
                    <div className="subheading-lbl">{item.displayName.toUpperCase()}</div>
                    <div className="ul_list"></div>
                  </div>
                  <div className="address-section show">
                    <div className="country-name"></div>
                    <div className="address-list">
                      {item.fields.ListOffices.map((elm, index) => (
                        <div key={index} className="address-list-item">
                          <div className="address-heading">{elm.fields.Name?.value}</div>
                          <div className="address">
                            <p>{elm.fields.Address?.value}</p>
                          </div>
                          <div>
                            <p>{elm.fields.Phone1?.value}</p>
                          </div>
                          <div>
                            <p>{elm.fields.Phone2?.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WorldMap;
