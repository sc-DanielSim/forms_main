import { ComponentParams, RichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';

type TRichTextContentProps = {
  fields: {
    Content: RichTextField;
  };
  params: ComponentParams;
};

export default function RichTextContent(props: TRichTextContentProps) {
  const styles = props.params?.Styles || '';
  return (
    <div className={`${styles}`}>
      <RichText className="rich-text__content" field={props.fields?.Content} />
    </div>
  );
}
