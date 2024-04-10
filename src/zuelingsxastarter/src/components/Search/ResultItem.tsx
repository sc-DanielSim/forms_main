import {
  Field,
  LinkField,
  RichText as JSSRichText,
  RichTextField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ZpLink from 'components/Common/ZpLink';

export type TResultItem = {
  id: string;
  buttonLink: LinkField;
  title: Field<string>;
  description: RichTextField;
  hide?: boolean;
};

export default function ResultItem({ buttonLink, title, description, hide }: TResultItem) {
  return (
    <div className={`zp-corporate-result-list ${hide ? 'hide' : ''}`}>
      <ZpLink className="zp-search-url" btnLink={buttonLink}>
        <>
          <div className="zp-search-header">
            <Text field={title} />
          </div>
          <JSSRichText field={description} />
        </>
      </ZpLink>
    </div>
  );
}
