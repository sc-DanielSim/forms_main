import React from 'react';
import { LinkField, TextField, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
type CategoryButton = {
  ButtonLink: {
    jsonValue: LinkField;
  };
  ButtonName: {
    jsonValue: TextField;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: CategoryButton[];
      };
    };
  };
}
interface ICategoryButtonsProps {
  fields: Fields;
  params: ComponentParams;
}

const CategoryButtons = (props: ICategoryButtonsProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  if (datasource) {
    const list = datasource.children.results.map((element: CategoryButton, idx: number) => (
      <div
        key={idx}
        className={idx % 3 == 2 ? 'gradiant-section bottom-right-gradient' : 'gradiant-section'}
      >
        <Link
          className="contact-us-btn-link"
          href={element.ButtonLink?.jsonValue?.value?.href ?? '/'}
        >
          {element.ButtonName?.jsonValue?.value ?? ''}
        </Link>
      </div>
    ));
    return (
      <div
        className={`corp-component component-category-buttons zp-corporate-contact-us-btn-section corp-8-col ${styles}`}
      >
        {list}
      </div>
    );
  }
  return (
    <div
      className={`corp-component component-category-buttons zp-corporate-contact-us-btn-section corp-8-col ${styles}`}
    ></div>
  );
};
export default CategoryButtons;
