import { Fragment } from 'react';
import {
  ComponentParams,
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  LinkFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { TJsonVal, TJsonValBase } from 'src/types/jsonvalue';
import Image from 'next/image';
import ZpLink from 'components/Common/ZpLink';

interface IFooterProps {
  fields?: {
    data: {
      datasource: {
        Logo: {
          jsonValue: ImageField;
        };
        ShortDescription: TJsonVal;
        CopyRightText: TJsonVal;
        LegalAddress: TJsonVal;
      };
      footer_navigations: {
        children: {
          results: TJsonValBase[];
        };
      };
      social_navigations: {
        children: {
          results: TJsonValBase[];
        };
      };
      legal_navigations: {
        children: {
          results: {
            Title: {
              jsonValue: Field<string>;
            };
            Link: {
              jsonValue: LinkField;
            };
          }[];
        };
      };
    };
  };
  params: ComponentParams;
}

const Footer = ({ fields, params }: IFooterProps): JSX.Element => {
  const { data } = fields || {};
  const srcContents = data?.datasource;
  const socials = data?.social_navigations?.children?.results;
  const linksColumn = data?.footer_navigations?.children?.results;
  const legals = data?.legal_navigations?.children?.results;
  const styles = params?.Styles || '';

  const renderSocialLinks = () => {
    return (
      <div className="f-social__container">
        {socials?.map((item, index) => {
          const socialName = item.Title?.jsonValue?.value?.toLowerCase();
          return (
            <ZpLink
              key={index}
              className="f-social__link"
              btnLink={item.Link?.jsonValue as Field<LinkFieldValue>}
            >
              <span aria-label={`${socialName} icon image widget`} role="region">
                <Image
                  className="expand-icon"
                  src={`/images/${socialName}_white.svg`}
                  alt={`${socialName} icon`}
                  width={24}
                  height={24}
                />
              </span>
            </ZpLink>
          );
        })}
      </div>
    );
  };

  const renderLinksColumn = () => {
    const lastColumnLinks: JSX.Element[] = [];
    return (
      <div className="f-links__container">
        {linksColumn?.map((item, index) => {
          if (index < 3) {
            return (
              <div key={index} className="f-links__col">
                <ZpLink className="f-links__title" btnLink={item.Link?.jsonValue}>
                  {item.Title?.jsonValue?.value}
                </ZpLink>
                {item.children?.results.map((elm, idx) => (
                  <ZpLink key={idx} className="f-links__item" btnLink={elm.Link?.jsonValue}>
                    {elm.Title?.jsonValue?.value}
                  </ZpLink>
                ))}
              </div>
            );
          } else {
            lastColumnLinks.push(
              <ZpLink key={index} className="f-links__title" btnLink={item.Link?.jsonValue}>
                {item.Title?.jsonValue?.value}
              </ZpLink>
            );
            return <Fragment key={index}></Fragment>;
          }
        })}

        {lastColumnLinks.length && <div className="f-links__col">{lastColumnLinks}</div>}
      </div>
    );
  };

  const renderLegalLinks = () => {
    return (
      <>
        {legals?.map((item, index) => (
          <ZpLink key={index} className="f-legal__link" btnLink={item.Link.jsonValue}>
            {item.Title?.jsonValue?.value}
          </ZpLink>
        ))}
      </>
    );
  };

  return (
    <div className={`corp-component component-banner-video ${styles}`}>
      <footer className="zp-corporate-portal-footer f-container">
        <div className="f-content">
          <div className="f-logo__container">
            <Link className="f-logo__link" href="/">
              {srcContents?.Logo.jsonValue?.value && (
                <JssImage field={srcContents.Logo.jsonValue?.value} width="119" height="40" />
              )}
            </Link>
          </div>
          <div className="f-main__container">
            <div className="f-main__description">
              {srcContents?.ShortDescription.jsonValue?.value}
              {renderSocialLinks()}
            </div>
            {renderLinksColumn()}
          </div>
          <div className="f-legal__container">
            <p className="f-legal__copyright">{srcContents?.CopyRightText.jsonValue?.value}</p>
            {renderLegalLinks()}
            <p className="f-legal__address">{srcContents?.LegalAddress.jsonValue?.value}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
