import { ComponentParams, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import { useEffect, useState } from 'react';
import { WHITE_COLOR } from 'src/constants/colorsConst';

interface IBannerStaticProps {
  fields: {
    Title: Field<string>;
    Content: Field<string>;
    Image: Field<ImageField>;
    TitleColor: Field<string>;
    DescriptionColor: Field<string>;
  };
  params: ComponentParams;
}

const BannerStatic = (props: IBannerStaticProps): JSX.Element => {
  const styles = props.params?.Styles || '';
  const { fields } = props;
  const title = fields?.Title?.value;
  const content = fields?.Content?.value;
  const titleColor = fields?.TitleColor?.value || WHITE_COLOR;
  const descriptionColor = fields?.DescriptionColor?.value || WHITE_COLOR;
  const [transFormScale, setTransFormScale] = useState(1);
  const [maxWidthScale, setMaxWidthScale] = useState(1400);

  function handleTransFormScale() {
    const MIN_SCALE = 1;
    let newScale = MIN_SCALE + window.scrollY / 2000;

    // Limit the maximum scale to 2
    newScale = Math.min(newScale, 1.5);

    // Only update the scale if it has changed
    if (newScale !== transFormScale || transFormScale === MIN_SCALE) {
      setTransFormScale(newScale);
    }
  }

  function handleMaxWidthScale() {
    const MIN_SCALE = 1400;
    // Calculate the new scale based on the scroll position
    let newScale = MIN_SCALE + window.scrollY * 0.6;

    // Limit the maximum scale to 2
    newScale = Math.min(newScale, 1800);

    // Only update the scale if it has changed
    if (newScale !== maxWidthScale || maxWidthScale === MIN_SCALE) {
      setMaxWidthScale(newScale);
    }
  }

  useEffect(() => {
    // Attach a scroll event listener to the window
    document.addEventListener('scroll', handleTransFormScale);
    document.addEventListener('scroll', handleMaxWidthScale);

    return () => {
      document.removeEventListener('scroll', handleTransFormScale);
      document.removeEventListener('scroll', handleMaxWidthScale);
    };
  }, []);

  return (
    <div
      id="banner-ctn"
      className={`zp-corporate-banner-section banner-ctn ${styles}`}
      style={{ maxWidth: '' + maxWidthScale + 'px' }}
    >
      <ZpImage
        image={fields?.Image}
        className="inner-page-banner-image banner-image"
        style={{ transform: 'scale(' + transFormScale + ')' }}
      />
      <div className="banner-content-section">
        <h1 className="banner-title col-sm-12 col-lg-7">
          <p>
            <span className="banner-text-title" style={{ color: titleColor }}>
              {title}
            </span>
          </p>
        </h1>
        <div className="banner-description col-sm-12 col-md-10 col-lg-8">
          <span className="banner-text-description" style={{ color: descriptionColor }}>
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerStatic;
