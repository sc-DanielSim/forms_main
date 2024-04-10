import { useContext } from 'react';
import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import ZpImage from 'components/Common/ZpImage';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { NewsConfigurationContext, TNewsConfigurationContext } from 'src/Layout';
import { getCategories } from './../../redux/ocNewsCategories';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { TNewsDetail, TListItem, TNewsTag } from 'src/types/news';

type TNewsListingItem = TListItem & { fields: TNewsDetail };

interface INewsListingProps {
  fields: {
    items: TNewsListingItem[];
  };
  params: ComponentParams;
  articles?: {
    data?: {
      pageOne?: {
        results?: TNewsListingItem[];
      };
    };
  };
}
const NewsListing = (props: INewsListingProps): JSX.Element => {
  // console.log('NewsListing props', props);

  const PAGE_SIZE = 9;
  const styles = props.params?.Styles || '';
  const items = props.fields?.items || [];
  const newsConfigurationContext: TNewsConfigurationContext = useContext(NewsConfigurationContext);
  const allOptionTxt = newsConfigurationContext.allOptionTxt;
  const categoryList: TNewsTag[] = useSelector(getCategories);

  items.sort((prev, next) => {
    return (
      new Date(next.fields?.DisplayDate?.value).getTime() -
      new Date(prev.fields?.DisplayDate?.value).getTime()
    );
  });

  // Dropdown
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentCatId, setCurrentCatId] = useState<string>();
  const [currentCatName, setCurrentCatName] = useState<string | undefined>(allOptionTxt);
  const [currentItems, setCurrentItems] = useState<TNewsListingItem[]>(items);
  const [numOfShowMore, setNumOfShowMore] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    if (!currentCatId) {
      setCurrentItems(items);
      setCurrentCatName(allOptionTxt);
    } else {
      const filteredItems = items.filter((item: TNewsListingItem) => {
        return item.fields.CategoryTags?.filter((cat) => cat.id === currentCatId).length;
      });
      setCurrentItems(filteredItems);
    }
    setNumOfShowMore(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCatId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  const handleClickDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectAll = () => {
    setCurrentCatId(undefined);
  };

  const handleSelectCategory = (catId: string, catName: string) => {
    setCurrentCatId(catId);
    setCurrentCatName(catName);
  };

  const handleShowMore = () => {
    setNumOfShowMore(numOfShowMore + PAGE_SIZE);
  };

  return (
    <div className={`corp-component component-news-listing ${styles}`}>
      <div className="zp-margin-top-small zp-margin-bottom-small">
        <div className="zp-corporate-articles-filter-section corp-12-col">
          <div className="articles-filter-section">
            <button
              type="button"
              className="articles-category-select"
              onClick={handleClickDropdown}
              ref={dropdownRef}
            >
              <span className="btn-txt">{currentCatName}</span>
              <Image
                src="/images/common/dropdown-arrow.svg"
                className="arrow-img"
                alt="select arrow"
                width={14}
                height={7}
              />
            </button>
            <div className={`articles-category-list${showDropdown ? '' : ' hide'}`}>
              <div className="articles-category-list-item active" onClick={handleSelectAll}>
                {allOptionTxt}
              </div>
              {categoryList.map((item) => (
                <div
                  key={item.id}
                  className="articles-category-list-item"
                  onClick={() => handleSelectCategory(item.id, item.displayName)}
                >
                  {item.displayName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-0">
        <section className="portlet">
          <div className="portlet-content">
            <div className=" portlet-content-container">
              <div className="portlet-body">
                <div className="zp-corporate-article-list corp-12-col">
                  <div className="article-list corp-grid-layout des-3-col tab-2-col">
                    {currentItems?.map((item, index) => {
                      const postedDate = moment(new Date(item.fields.DisplayDate?.value) || null);
                      return (
                        <div
                          key={item.id}
                          className={`article-list-item active${
                            index >= numOfShowMore ? ' hide' : ''
                          }`}
                        >
                          <div className="img-section">
                            <Link className="article-detail-page-link" href={item.url}>
                              <ZpImage
                                height={246}
                                useMaxHeight
                                image={item.fields.Image}
                                className="d-block w-100 article-img"
                              />
                            </Link>
                          </div>
                          <div className="btn-section">
                            {[item.fields.FeaturedTag, ...(item.fields?.CategoryTags || [])].map(
                              (tag) =>
                                tag && (
                                  <button key={tag?.id} className="article-btn">
                                    {tag?.displayName}
                                  </button>
                                )
                            )}
                            {item.fields.NewsTypeTag?.value && (
                              <button className="article-btn">
                                {item.fields.NewsTypeTag?.value}
                              </button>
                            )}
                          </div>
                          <Link className="article-detail-page-link" href={item.url}>
                            <h2 className="title">{item.fields.Title?.value}</h2>
                          </Link>
                          <div className="subtitle">{item.fields.ShortContent?.value}</div>
                          <div className="published-date">
                            {postedDate?.isValid() ? postedDate.format('DD MMMM YYYY') : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`no-article-list-found-section${
                      currentItems.length || items === undefined ? ' hide' : ''
                    }`}
                  >
                    <h2 className="title">{newsConfigurationContext.noResultFoundTxt}</h2>
                  </div>
                  <div className="article-list-pagination-section">
                    <button
                      className={`load-more${numOfShowMore >= currentItems.length ? ' hide' : ''}`}
                      onClick={handleShowMore}
                    >
                      {newsConfigurationContext.showMoreTxt}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const headers = {
    'content-type': 'application/json',
    'X-GQL-Token': process.env.SITECORE_API_KEY,
  };
  const requestBody = {
    query: `fragment newsListing on Item {
      ... on NewsDetail {
        title {
          value
        },
        content {
          value
        },
        shortContent {
          value
        },
        image {
          ...imageField
        },
        displayDate {
          value
        },
        featuredTag {
          ...featuredTags
        },
        categoryTags {
          ...multilistFields
        }
      }
      url {
        path
      }
    }
     
    fragment imageField on ImageField {
      jsonValue
    }
     
    fragment multilistFields on MultilistField {
      value: targetItems {
        id
        name
        displayName
      }
    }
     
    fragment featuredTags on LookupField 
    {
      value:targetItem
      {
        id
        name
        displayName
      }
    }
     
    query getNewsListing($pageSize: Int!, $after:String) {
      pageOne: search(
         where: {
           AND: [
            {
              name: "_path"
              value: "{48A1AAA2-9281-49A6-A562-BEBAC72CFC57}"
              operator: CONTAINS
            }
            {
              name: "_templates"
              value: "{03C5C783-F4AB-4D3B-A170-B8308E079A50}"
              operator: EQ
            }
           ]
         }
        first: $pageSize
        after: $after
        orderBy: { name: "displayDate", direction: DESC }
       ) {
         total
         pageInfo {
           endCursor
           hasNext
         }
         results {
           ...newsListing
         }
       }
    }`,
    variables: { pageSize: 1000, after: null },
  };
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  };
  const response = await (
    await fetch(process.env.GRAPH_QL_ENDPOINT || '', options as RequestInit)
  ).json();
  return { articles: response };
};

export default NewsListing;
