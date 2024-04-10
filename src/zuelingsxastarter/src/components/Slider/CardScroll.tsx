import { ComponentParams, Field, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import { memo, useEffect, useState } from 'react';
import useWindowSize from 'src/hooks/useWindowSize';

type TCardScrollProps = {
  fields?: {
    ListItem: TCardScrollItem[];
  };
  params: ComponentParams;
};

type TCardScrollItem = {
  id: string;
  name: string;
  displayName: string;
  url: string;
  fields: {
    Title: Field<string>;
    ShortDescription: Field<string>;
    Description: Field<string>;
    Image: Field<ImageField>;
  };
};

const defaultBackgroundImageData: Field<ImageField> = {
  value: {
    value: {
      src: '/images/defaultBackgroundImageCardScroll.jpeg',
      alt: '',
      width: '840',
      height: '1140',
    },
  },
};

function CardScrollItems({ cardScrollItems }: { cardScrollItems: TCardScrollItem[] }) {
  return (
    <>
      {cardScrollItems?.map((cardScrollItem) => (
        <div key={cardScrollItem.id} className="zp-img-scroller__item">
          {Object.keys(cardScrollItem.fields.Image.value).length === 0 ? (
            <ZpImage image={defaultBackgroundImageData} className="zp-img-scroller__image" />
          ) : (
            <ZpImage image={cardScrollItem.fields.Image} className="zp-img-scroller__image" />
          )}

          <div className="zp-img-scroller__main">
            <h4 className="zp-img-scroller__title">
              <Text field={cardScrollItem.fields.Title} />
            </h4>
            <p className="zp-img-scroller__content">
              <Text field={cardScrollItem.fields.ShortDescription} />
            </p>
          </div>
          <div className="zp-img-scroller__hidden">
            <p className="zp-img-scroller__hidden-content">
              <Text field={cardScrollItem.fields.Description} />
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

const CardScrollItemsComponent = memo(CardScrollItems);

export default function CardScroll(props: TCardScrollProps) {
  const styles = props.params?.Styles || '';
  const cardScrollItems: TCardScrollItem[] = props.fields?.ListItem || [];
  const itemsPerPage = 1;
  const cardSize = 280;
  const paddingSize = 20;
  const totalPages = Math.ceil(cardScrollItems?.length / itemsPerPage);

  const windowSize = useWindowSize();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentXPosition, setCurrentXPosition] = useState(0);
  const [styleChangeSlide, setStyleChangeSlide] = useState('translateX(0)');

  const moveTo = (to: number) => {
    setStyleChangeSlide(`translateX(calc(${to}px)`);

    setCurrentXPosition(to);
  };

  const handlePageChange = (page: number) => {
    if (page < currentPage) {
      moveTo(currentXPosition + (cardSize + paddingSize));
    }
    if (page > currentPage) {
      moveTo(currentXPosition - (cardSize + paddingSize));
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentPage > totalPages) {
        setCurrentPage(1);
        moveTo(0);
      } else {
        moveTo(currentXPosition);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <>
      <div className="corp-component component-card-scroll">
        <div className="zp-img-scroller__wrapper">
          <div className={`zp-img-scroller__container ${styles}`}>
            <div className="zp-img-scroller__list-container">
              <div className="zp-img-scroller__list" style={{ transform: styleChangeSlide }}>
                <CardScrollItemsComponent cardScrollItems={cardScrollItems} />
              </div>
            </div>
            <div className="zp-img-scroller__pagination">
              <button
                className="zp-img-scroller__pagination-toggle zp-img-scroller__pagination-toggle--left"
                disabled={currentPage <= 1}
                onClick={() => {
                  handlePageChange(currentPage - 1);
                }}
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 41"
                  width="40"
                  height="41"
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
              <button
                className="zp-img-scroller__pagination-toggle zp-img-scroller__pagination-toggle--right"
                disabled={currentPage >= totalPages}
                onClick={() => {
                  handlePageChange(currentPage + 1);
                }}
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 41"
                  width="40"
                  height="41"
                >
                  <use href="#arrow"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
