import React from 'react';
import { Field, LinkFieldValue, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

interface ICTAHorizontalProps {
  fields: {
    Title: Field<string>;
    Content: Field<string>;
    ButtonText: Field<string>;
    ButtonLink: Field<LinkFieldValue>;
  };
  params: ComponentParams;
}

const CTAHorizontal = (props: ICTAHorizontalProps): JSX.Element => {
  const { fields } = props;
  const title = fields?.Title?.value;
  const content = fields?.Content?.value;
  const buttonText = fields?.ButtonText?.value;
  const buttonLink = fields?.ButtonLink?.value;
  const styles = props.params && props.params?.Styles ? props.params?.Styles : '';
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-cta-horizontal ${styles}`}>
      <div className="corp-12-col">
        <div className="tabs-header-section">
          <h2 className="title">{title}</h2>
          <div className="cta-section">
            <a href={buttonLink?.href} target={buttonLink?.target} className="cta-link">
              {buttonText}
            </a>
          </div>
        </div>
      </div>
      <div className="corp-12-col">
        <div className="description">{content}</div>
      </div>
    </div>
  );
};

export default CTAHorizontal;
