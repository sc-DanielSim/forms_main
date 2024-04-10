import {
  Field,
  ImageField,
  LinkFieldValue,
  ComponentParams,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import { ensureValidValue } from 'src/utils/layoutStyleUtil';
interface ITwoColumnContentProps {
  fields: {
    Title: Field<string>;
    Content: RichTextField;
    ButtonText: Field<string>;
    ButtonLink: Field<LinkFieldValue>;
    ButtonStyle: Field<string>;
    HeadingStyle: Field<string>;
    Image: Field<ImageField>;
    ImagePosition: Field<string>;
    ImageStyle: Field<string>;
  };
  params: ComponentParams;
}

const TwoColumnContent = (props: ITwoColumnContentProps): JSX.Element => {
  const { fields } = props;
  const title = fields?.Title?.value;
  const buttonText = fields?.ButtonText?.value;
  const buttonLink = fields?.ButtonLink?.value;
  const buttonStyle = fields?.ButtonStyle.value;
  const imagePosition = fields?.ImagePosition.value;
  const headingStyle = fields?.HeadingStyle.value;
  let styles = props.params && props.params.Styles ? props.params.Styles : '';
  const imageStyle = fields?.ImageStyle?.value;
  styles = ensureValidValue(styles);

  let imageCss: string;
  if (imageStyle === 'Fit') {
    imageCss = 'object-fit-contain';
  } else {
    imageCss = '';
  }

  if (headingStyle === 'Style 1') {
    return (
      <div className={`corp-component component-two-column-content ${styles}`}>
        <div className="two-column-inner-section">
          <div className="wrap">
            <div className="img-section">
              <ZpImage image={fields.Image} className={`careers-img ${imageCss}`} />
            </div>
          </div>
          <div className={` content-section ${imagePosition === 'Right' ? 'flip' : ''} `}>
            <h2 className="title">{title}</h2>
            <div className="description">
              <RichText className="rich-text__content" field={fields?.Content} />
            </div>
            {buttonStyle === 'Style 1' && (
              <a className="black-link" href={buttonLink.href} target={buttonLink.target}>
                {buttonText}
              </a>
            )}
            {buttonStyle === 'Style 2' && (
              <a className="redirect-link" href={buttonLink.href} target={buttonLink.target}>
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (headingStyle === 'Style 2') {
    return (
      <div className={`corp-component component-two-column-content ${styles}`}>
        <div id="style-2">
          <div
            className={` ${imagePosition === 'Right' ? 'reverse-components' : ''} increase-margin `}
          >
            <div className="img-section">
              <ZpImage image={fields.Image} className="pharma-img" />
            </div>
            <div className="content-section">
              <div className="content-inner-section">
                <h4 className="title">{title}</h4>
                <div className="description">
                  <RichText className="rich-text__content" field={fields?.Content} />
                </div>
                {buttonStyle === 'Style 1' && (
                  <a className="read-more-link" href={buttonLink.href} target={buttonLink.target}>
                    {buttonText}
                  </a>
                )}
                {buttonStyle === 'Style 2' && (
                  <a className="redirect-link" href={buttonLink.href} target={buttonLink.target}>
                    {buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default TwoColumnContent;
