import { Field, ImageField, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';

interface IBannerVideoProps {
  fields: {
    BackgroundVideo: Field<{
      id: string;
      href: string;
    }>;
    Title: Field<string>;
    Content: Field<string>;
    Image: Field<ImageField>;
  };
  params: ComponentParams;
}

const BannerVideo = (props: IBannerVideoProps): JSX.Element => {
  const { fields } = props;
  const videoUrl = fields?.BackgroundVideo?.value;
  const title = fields?.Title?.value;
  const content = fields?.Content?.value;
  const styles = props.params && props.params?.Styles ? props.params?.Styles : '';
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-banner-video ${styles}`}>
      <div>
        <div className="zp-corporate-portal-home-page">
          <div id="main" className="zp-main-corporate-portal">
            <section className="hero-banner-section">
              <div className="hero-image">
                <div className="hero-content-section">
                  <h1 className="hero-title">{title}</h1>
                  <span className="hero-subcontent">{content}</span>
                </div>
                <div className="overlay"></div>
                <ZpImage image={fields?.Image} />
                <video loop autoPlay={true} muted>
                  <source src={videoUrl?.href} type="video/mp4" />
                </video>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerVideo;
