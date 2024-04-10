import React from 'react';
import {
  Field,
  ComponentParams,
  RichText as JssRichText,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface INewsDetail {
  fields: {
    Image: Field<ImageField>;
    Title?: Field<string>;
    DisplayDate?: Field<string>;
    Tags?: string[];
    Content?: Field<string>;
    ShortContent?: Field<string>;
  };
  params: ComponentParams;
}

const NewsDetail = (props: INewsDetail): JSX.Element => {
  const styles = props.params.Styles || '';

  return (
    <>
      <div className={`corp-component component-news-content corp-8-col ${styles}`}>
        <JssRichText className="rich-text__content" field={props.fields.Content} />
      </div>
    </>
  );
};

export default NewsDetail;
