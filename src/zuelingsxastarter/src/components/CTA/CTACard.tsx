import React from 'react';
import {
  Field,
  LinkFieldValue,
  ImageField,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import Link from 'next/link';

interface ICTACardProps {
  fields: {
    Title: Field<string>;
    Content: Field<string>;
    ButtonText: Field<string>;
    ButtonLink: Field<LinkFieldValue>;
    BackgroundImage: Field<ImageField>;
  };
  params: ComponentParams;
}

const CTACard = (props: ICTACardProps): JSX.Element => {
  const { fields } = props;
  const title = fields?.Title?.value;
  const content = fields?.Content?.value;
  const buttonText = fields?.ButtonText?.value;
  const buttonLink = fields?.ButtonLink?.value;
  const styles = props.params && props.params?.Styles ? props.params?.Styles : '';
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-cta-card ${styles}`}>
      <div className="zp-corp-cta zp-corp-cta--12-col">
        <div>
          <ZpImage
            image={fields?.BackgroundImage}
            className="zp-corp-cta__background"
            alt="image"
          />
          <div className="zp-corp-cta__content-section">
            <h2 className="zp-corp-cta__title">{title}</h2>
            <div className="zp-corp-cta__description">{content}</div>
            <Link className="zp-corp-cta__button" href={buttonLink?.href ?? ''}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTACard;
