import React from 'react';
import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Subheading: Field<string>;
  iFrameLink: LinkField;
  SectionLink: LinkField;
  MaxHeight: Field<string>;
  MaxWidth: Field<string>;
  Border: Field<boolean>;
}

type IFrameProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const IFrameDefaultComponent = (props: IFrameProps): JSX.Element => (
  <div className={`component iframe ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">IFrame</span>
    </div>
  </div>
);

export const Default = (props: IFrameProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  if (props.fields) {
    return (
      <div className={`component iframe ${props.params.styles}`} id={id || undefined}>
        <div className="component-content">
          <iframe src={props.fields.SectionLink.value.href} title="Testing"></iframe>
        </div>
      </div>
    );
  }

  return <IFrameDefaultComponent {...props} />;
};
