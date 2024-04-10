import React from 'react';
import { Field, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

interface IInnerPageHeadingProps {
  fields: {
    Title?: Field<string>;
  };
  params: ComponentParams;
}

const InnerPageHeading = (props: IInnerPageHeadingProps): JSX.Element => {
  const { fields } = props;
  const styles = props.params?.Styles || '';
  return (
    <div className={`corp-component component-inner-page-heading ${styles}`}>
      <h4>{fields?.Title?.value}</h4>
    </div>
  );
};

export default InnerPageHeading;
