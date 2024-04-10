import {
  Field,
  ImageField,
  LinkFieldValue,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import ZpLink from './ZpLink';

interface ICorporate_AnnouncementProps {
  fields: {
    Title?: Field<string>;
    Content?: Field<string>;
    Image: Field<ImageField>;
    ButtonText?: Field<string>;
    ButtonLink?: Field<LinkFieldValue>;
  };
  params: ComponentParams;
}

const Corporate_Announcement = (props: ICorporate_AnnouncementProps): JSX.Element => {
  const { fields } = props;
  const styles = props.params?.Styles || '';

  return (
    <div className={`corp-component component-announcement ${styles}`}>
      <div className="zp-corporate-full-width-image-component">
        <div className="image-section">
          <ZpImage className="full-width-image" alt="full-width-image" image={fields.Image} />
        </div>
        <div className="image-caption"></div>
      </div>
      <div>
        <h3 className="zp-corporate-h3-section zp-corporate-h3-section--eight">
          <div className="text-center">{fields?.Title?.value}</div>
        </h3>
      </div>
      <div className="text-center">
        <h4 className="zp-h4-header zp-h4-header--ten">{fields?.Content?.value}</h4>
      </div>
      <div className="text-center zp-margin-top-small zp-margin-bottom-small">
        <div>
          <div className="component-button text-break zp-corp-cta">
            <ZpLink className="zp-corp-cta__button" btnLink={fields?.ButtonLink}>
              {fields.ButtonText?.value}
            </ZpLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate_Announcement;
