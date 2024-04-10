import React, { useEffect, useState } from 'react';
import { Field, ComponentParams, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import Image from 'next/image';
import moment from 'moment';
import { SOCIAL_FACEBOOK, SOCIAL_LINKEDIN, SOCIAL_TWITTER } from 'src/constants/socialsConst';
import { TNewsTag } from 'src/types/news';

interface INewsHeader {
  fields: {
    Image: Field<ImageField>;
    Title?: Field<string>;
    DisplayDate?: Field<string>;
    CategoryTags?: TNewsTag[];
    NewsTypeTag?: TNewsTag;
    FeaturedTag?: TNewsTag;
  };
  params: ComponentParams;
}

const NewsHeader = (props: INewsHeader): JSX.Element => {
  const styles = props.params?.Styles || '';
  const { fields } = props;
  const postedDate = fields.DisplayDate && moment(new Date(fields.DisplayDate?.value) || null);
  const categoryTags = fields.CategoryTags || [];
  const newsTypeTag = fields?.NewsTypeTag?.fields?.Title?.value ?? '';
  const featuredTag = fields.FeaturedTag?.fields.Title?.value ?? '';
  let tags: string[] = [featuredTag, newsTypeTag];
  categoryTags.map((item) => tags.push(item.fields.Title?.value ?? ''));
  tags = tags.filter((tag) => tag);

  const [currentUrl, setcurrentUrl] = useState<string>();

  const handleShare = (type: string): string => {
    const articalTitle = encodeURI(fields.Title?.value || '');

    switch (type) {
      case SOCIAL_FACEBOOK:
        return `http://www.facebook.com/sharer.php?u=${currentUrl}`;
      case SOCIAL_TWITTER:
        return `https://twitter.com/intent/tweet?text=${articalTitle}&tw_p=tweetbutton&url=${currentUrl}`;
      case SOCIAL_LINKEDIN:
        return `http://www.linkedin.com/shareArticle?title=${articalTitle}&mini=true&url=${currentUrl}&summary=${articalTitle}`;
      default:
        return '#';
    }
  };

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <div className={`corp-component component-news-header ${styles}`}>
      <div className="banner-content-section">
        <ZpImage
          image={fields.Image}
          className="d-block w-100 article-detail-img"
          alt={fields.Title?.value}
        />
        <div className="article-header-section corp-10-col">
          <div className="header-content-section">
            <div className="btn-date-section">
              <div className="btn-section">
                {tags && <button className="article-btn">{tags.join(', ')}</button>}
              </div>
              <div className="published-date-section">
                {postedDate?.isValid() ? postedDate.format('D MMMM YYYY') : ''}
              </div>
            </div>
            <h1 className="title">
              <Text field={fields.Title} />
            </h1>
            <div className="social-icons">
              <a target="_blank" href={handleShare(SOCIAL_FACEBOOK)}>
                <Image
                  src="/images/facebook-icon.svg"
                  alt="facebook icon"
                  className="icon"
                  width={22}
                  height={22}
                />
              </a>
              <a target="_blank" href={handleShare(SOCIAL_TWITTER)}>
                <Image
                  src="/images/twitter-icon.svg"
                  alt="twitter icon"
                  className="icon"
                  width={22}
                  height={22}
                />
              </a>
              <a target="_blank" href={handleShare(SOCIAL_LINKEDIN)}>
                <Image
                  src="/images/linkedin-icon-black.svg"
                  alt="linkedin icon"
                  className="icon"
                  width={22}
                  height={22}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHeader;
