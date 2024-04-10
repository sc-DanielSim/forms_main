import {
  Field,
  RichText as JssRichText,
  RichTextField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ensureValidValue } from 'src/utils/layoutStyleUtil';

type TTwoColumnText = ComponentProps & {
  fields: {
    TitleLeft: Field<string>;
    ContentLeft: RichTextField;
    TitleRight: Field<string>;
    ContentRight: RichTextField;
  };
};

const TwoColumnText = (props: TTwoColumnText) => {
  const { fields } = props;
  let styles = props?.params?.Styles || '';
  styles = ensureValidValue(styles);
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-two-column-text ${styles}`}>
      <div className="component-two-column-text__mobile-tablet">
        <div className="two-column-inner-section">
          <div className="content-section">
            {fields?.TitleLeft?.value && (
              <Text tag="h2" className="title" field={fields?.TitleLeft} />
            )}
            <JssRichText className="content" field={fields?.ContentLeft} />
          </div>
          <div className="content-section">
            {fields?.TitleRight?.value && (
              <Text tag="h2" className="title" field={fields?.TitleRight} />
            )}
            <JssRichText className="content" field={fields?.ContentRight} />
          </div>
        </div>
      </div>
      <div className="component-two-column-text__desktop">
        <div className="content-section two-column-inner-section">
          {fields?.TitleLeft?.value && (
            <Text tag="h2" className="title" field={fields?.TitleLeft} />
          )}
          {fields?.TitleRight?.value && (
            <Text tag="h2" className="title" field={fields?.TitleRight} />
          )}
        </div>
        <div className="content-section two-column-inner-section">
          <JssRichText className="content" field={fields?.ContentLeft} />
          <JssRichText className="content" field={fields?.ContentRight} />
        </div>
      </div>
    </div>
  );
};
export default TwoColumnText;
