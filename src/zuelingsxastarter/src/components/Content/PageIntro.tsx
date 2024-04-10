import React from 'react';
import { Field, RichText as JssRichText, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

interface IPageIntroProps {
  fields: {
    IntroHeader: Field<string>;
    IntroDescription: Field<string>;
  };
  params: ComponentParams;
}

const PageIntro = (props: IPageIntroProps): JSX.Element => {
  const { fields } = props;
  const styles = props?.params?.Styles || '';
  return (
    <div className={`corp-component component-page-intro zp-corporate-inner-page-intro ${styles}`}>
      <div className="header-section">
        <JssRichText className="rich-text__content" field={fields?.IntroHeader} />
      </div>
      <div className="sub-header-section">
        <JssRichText className="rich-text__content" field={fields?.IntroDescription} />
      </div>
    </div>
  );
};

export default PageIntro;
