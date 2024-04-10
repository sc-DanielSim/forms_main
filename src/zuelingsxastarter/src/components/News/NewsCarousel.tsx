import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import moment from 'moment';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { GET_NEWS_CAROUSEL_ITEMS } from 'src/constants/queryGQLConst';
import { fetchOptions } from 'src/constants/GQLConst';

type TNewsListingItem = {
  id: string;
  url: {
    path: string;
  };
  name: string;
  displayName: string;
  DisplayDate: {
    jsonValue: Field<string>;
  };
  NewsTypeTag?: Field<string>;
  CategoryTags?: {
    value: { name: string }[];
  };
  FeaturedTag: { value: { name: string } };
  ShortContent: Field<string>;
  Image: { src: string };
  Title: Field<string>;
};

interface INewsCarouselProps {
  fields?: {
    items?: TNewsListingItem[];
  };
  data?: {
    NewsCarousel: {
      total: number;
      results: TNewsListingItem[];
    };
    ButtonText?: {
      Phrase: Field<string>;
    };
  };
  params: ComponentParams;
}

const NewsCarousel = (props: INewsCarouselProps): JSX.Element => {
  const styles = props.params?.Styles || '';
  const MAXIMUM_FEATURED_ARTICLE_NUM = 6;
  let items = props.data?.NewsCarousel.results;
  const readMoreTxt = props.data?.ButtonText?.Phrase.value;

  items = items?.filter((article) => !!article.FeaturedTag?.value);

  return (
    <div className={`corp-component component-news-carousel ${styles}`}>
      <div className="corp-12-col zp-corporate-articles-carousel">
        <section>
          <Carousel controls={false} interval={4000}>
            {items?.map((article, index) => {
              if (index > MAXIMUM_FEATURED_ARTICLE_NUM) {
                return false;
              }

              const postedDate = moment(new Date(article.DisplayDate.jsonValue.value) || null);
              let tags: string[] = [];

              if (article.CategoryTags?.value.length)
                tags = [...article.CategoryTags?.value.map((item) => item.name)];
              if (article.NewsTypeTag?.value) tags.push(article.NewsTypeTag?.value);

              return (
                <Carousel.Item key={article.id}>
                  <div className="carousel-item active">
                    <ZpImage
                      small
                      image={{ value: { value: { src: article.Image.src } } }}
                      className="d-block w-100 article-img"
                    />

                    <div className="dark-layer"></div>
                    <div className="carousel-caption article-description-section">
                      <div className="btn-section">
                        {tags.map((tag, index) => (
                          <button key={index} className="article-btn">
                            {tag}
                          </button>
                        ))}
                      </div>
                      <h2 className="title">{article.Title.value}</h2>
                      <div className="subtitle">{article.ShortContent.value}</div>
                      <div className="published-date">
                        {postedDate?.isValid() ? postedDate.format('DD MMMM YYYY') : ''}
                      </div>
                      <Link className="readmore-link" href={article.url.path}>
                        {readMoreTxt}
                      </Link>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </section>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context: ComponentRendering) => {
  const variables = { pageSize: 1000, datasource: context.dataSource };
  const requestBody = {
    query: GET_NEWS_CAROUSEL_ITEMS,
    variables,
  };
  const options = fetchOptions(requestBody);
  const data = await (
    await fetch(process.env.GRAPH_QL_ENDPOINT || '', options as RequestInit)
  ).json();
  return data;
};

export default NewsCarousel;
