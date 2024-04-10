import { Field, ImageField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useWindowSize from 'src/hooks/useWindowSize';

type TNewsSliderProps = ComponentProps & {
  fields?: {
    items: TStoryItem[];
  };
};

type TStoryItem = {
  id: string;
  url: string;
  displayName: string;
  fields: {
    DisplayDate: Field<Date>;
    Image: Field<ImageField>;
    Content: RichTextField;
    Title: Field<string>;
  };
};

function StoryItems({ storyItems }: { storyItems: TStoryItem[] }) {
  return (
    <>
      {storyItems.map((item) => (
        <Link key={item.id} className="zp-stories__item" href={item.url}>
          <ZpImage image={item.fields.Image} className="zp-stories__image" />
          <h4 className="zp-stories__title">
            <span className="zp-stories__title-anim">{item.fields.Title?.value}</span>
          </h4>
          <p className="zp-stories__content">{item.fields.Content?.value}</p>
        </Link>
      ))}
    </>
  );
}

const NewsSlider = (props: TNewsSliderProps): JSX.Element => {
  const styles = props.params?.Styles || '';
  const itemsPerPage = {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  };

  // Sort by Display date, most recent first
  // when creating articles, Content editor on CMS shall be able to manually select a “Display date” to be displayed on front-end site
  // (different from the actual Published date).
  const sortByDisplayName = (storyItems: TStoryItem[]) => {
    const sortedStoryItems = storyItems?.sort(
      (a, b) =>
        new Date(b.fields.DisplayDate?.value).getTime() -
        new Date(a.fields.DisplayDate?.value).getTime()
    );
    return sortedStoryItems;
  };

  const storyItems = sortByDisplayName(props?.fields?.items ?? []).slice(0, 21);

  const windowSize = useWindowSize();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentXPosition, setCurrentXPosition] = useState(0);
  const [styleChangeSlide, setStyleChangeSlide] = useState('translateX(calc(0% + 0px)');

  const moveTo = (to: number) => {
    if (windowSize.width < 768) {
      setStyleChangeSlide('translateX(calc(' + to + '%)');
    } else {
      setStyleChangeSlide('translateX(calc(' + to + '% + calc(20px * ' + to / 100 + ')))');
    }

    setCurrentXPosition(to);
  };

  const handlePageChange = (page: number) => {
    if (page < currentPage) {
      moveTo(currentXPosition + 100);
    }
    if (page > currentPage) {
      moveTo(currentXPosition - 100);
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    const stripHTML = (html: string): string => {
      const tmpElement = document.createElement('div');
      tmpElement.innerHTML = html;
      return tmpElement.textContent?.slice(0, 200) || '';
    };

    storyItems.forEach((storyItem) => {
      if (storyItem.fields.Content) {
        storyItem.fields.Content.value = stripHTML(storyItem.fields.Content?.value || '');
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let newItemsPerPage = itemsPerPage.desktop;

      if (windowSize.width <= 1198) {
        newItemsPerPage = itemsPerPage.tablet;
      }
      if (windowSize.width <= 767) {
        newItemsPerPage = itemsPerPage.mobile;
      }

      const totalPages = Math.ceil(storyItems.length / newItemsPerPage);
      setTotalPages(totalPages);

      if (currentPage > totalPages) {
        setCurrentPage(1);
        moveTo(0);
      } else {
        moveTo(currentXPosition);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  if (!props?.fields) {
    return <></>;
  }

  return (
    <div className={`corp-component component-news-slider ${styles}`}>
      <section className="portlet">
        <div className="portlet-content">
          <div className=" portlet-content-container">
            <div className="portlet-body">
              <div className="zp-stories__container">
                <div className="zp-stories__list-container">
                  <div className="zp-stories__list" style={{ transform: styleChangeSlide }}>
                    <StoryItems storyItems={storyItems} />
                  </div>
                </div>
                <div className="zp-stories__pagination">
                  <button
                    className="zp-stories__pagination-toggle zp-stories__pagination-toggle--left"
                    disabled={currentPage <= 1}
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                    }}
                  >
                    <svg
                      width="40px"
                      height="41px"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 40 41"
                    >
                      <path
                        id="arrow"
                        d="m24.7 30.2-9.9-9.9 9.9-9.9"
                        stroke="currentColor"
                        strokeWidth="3.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <div className="zp-stories__pagination-count">
                    <span className="zp-stories__pagination-numer">{currentPage}</span> /
                    <span className="zp-stories__pagination-denom">{totalPages}</span>
                  </div>
                  <button
                    className="zp-stories__pagination-toggle zp-stories__pagination-toggle--right"
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      handlePageChange(currentPage + 1);
                    }}
                  >
                    <svg
                      width="40px"
                      height="41px"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 40 41"
                    >
                      <use href="#arrow"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsSlider;
