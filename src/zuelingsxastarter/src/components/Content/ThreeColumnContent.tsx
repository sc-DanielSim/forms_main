import {
  Field,
  ImageField,
  LinkFieldValue,
  ComponentParams,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import ZpLink from 'components/Common/ZpLink';
import { IMAGE_STYLE } from 'src/constants/imageStylesConst';

interface IThreeColumnContentProps {
  fields: {
    ThreeColumnStyle: Field<string>;
    ListItems: {
      id: Field<string>;
      url: Field<string>;
      name: Field<string>;
      displayName: Field<string>;
      fields: {
        Link: Field<LinkFieldValue>;
        Image: Field<ImageField>;
        ImageStyle: Field<'Fill' | 'Fit'>;
        Title: Field<string>;
        Description: Field<string>;
        ShortDescription: Field<string>;
      };
    }[];
  };
  params: ComponentParams;
}

const ThreeColumnContent = (props: IThreeColumnContentProps): JSX.Element => {
  const { fields } = props;
  const variant = fields?.ThreeColumnStyle?.value;
  const styles = props.params?.Styles ? props.params.Styles : '';
  const listItems = fields?.ListItems || [];
  const containImgCls = 'is-contain-img';
  if (!fields) return <></>;
  if (variant === 'Style 1') {
    return (
      <div
        className={`corp-component component-three-column-content zp-variant-1 corp-12-col ${styles}`}
      >
        <div className="zp-corporate-page-section-card-list">
          {listItems?.length > 0 &&
            listItems.map((item) => (
              <div key={item?.id?.value}>
                <div>
                  <ZpLink className="zp-section-card-item" btnLink={item?.fields?.Link}>
                    <>
                      <ZpImage
                        className={`zp-section-card-item__image ${
                          item?.fields?.ImageStyle?.value === IMAGE_STYLE.fit ? containImgCls : ''
                        }`}
                        image={item?.fields?.Image}
                      />
                      <span className="zp-section-card-item__title">
                        {item?.fields?.Title?.value}
                      </span>
                      <div className="zp-section-card-item__content">
                        <JssRichText
                          className="rich-text__content"
                          field={item?.fields?.Description}
                        />
                      </div>
                    </>
                  </ZpLink>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (variant === 'Style 2') {
    return (
      <div className={`corp-component component-three-column-content zp-variant-2 ${styles}`}>
        <div className="zp-corporate-three-column-para-section corp-12-col">
          {listItems?.length > 0 &&
            listItems.map((item) => (
              <div key={item?.id?.value} className="zp-corporate-paracolumn-component">
                <div>
                  <ZpImage
                    className={`zp-img-txt__image ${
                      item?.fields?.ImageStyle?.value === IMAGE_STYLE.fit ? containImgCls : ''
                    }`}
                    image={item?.fields?.Image}
                    alt="half width image"
                  />
                  <h4 className="title">{item?.fields?.Title?.value}</h4>
                  <div className="description">
                    <JssRichText className="rich-text__content" field={item?.fields?.Description} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (variant === 'Style 4') {
    return (
      <div className={`corp-component component-three-column-content zp-variant-4 ${styles}`}>
        <div className="zp-corporate-three-column-para-section corp-12-col">
          {listItems?.length > 0 &&
            listItems.map((item) => (
              <div key={item?.id?.value} className="zp-corporate-paracolumn-component">
                <div>
                  <h4 className="title">{item?.fields?.Title?.value}</h4>
                  <div className="description">
                    <JssRichText className="rich-text__content" field={item?.fields?.Description} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (variant === 'Style 3') {
    return (
      <div className={`corp-component component-three-column-content zp-variant-3 ${styles}`}>
        <div className="zp-partner-stats zp-partner-stats--twelve">
          <h3 className="zp-partner-stats__title"></h3>
          <div className="zp-partner-stats__list">
            {listItems?.length > 0 &&
              listItems.map((item) => (
                <div key={item?.id?.value} className="zp-partner-stats__stat-item">
                  <div className="zp-partner-stats__stat-metric">{item?.fields?.Title?.value}</div>
                  <div className="zp-partner-stats__stat-description">
                    <JssRichText className="rich-text__content" field={item?.fields?.Description} />
                  </div>
                </div>
              ))}
            <div className="zp-partner-stats__disclaimer"></div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default ThreeColumnContent;
