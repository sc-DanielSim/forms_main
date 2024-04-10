import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Field, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { TResultItem } from 'src/components/Search/ResultItem';
import { getMainPages } from 'src/services/mainPageService';
import { getSuccessStories } from 'src/services/successStoriesService';
import { getArticles } from 'src/services/articleService';
import NoResult from './NoResult';
import ResultItem from './ResultItem';
import SearchCount from './SearchCount';

type RawMainPage = {
  parent: {
    parent: {
      id: string;
      displayName: string;
      url: {
        path: string;
      };
    };
  };
  title: Field<string>;
  content: RichTextField;
};
type Page = {
  id: string;
  displayName: string;
  href: string;
  dataSearch: string;
};
type RawSuccessStory = {
  parent: {
    parent: {
      id: string;
      displayName: string;
      url: {
        path: string;
      };
    };
  };
  content: RichTextField;
};
type SuccessStory = {
  id: string;
  displayName: string;
  url: {
    path: string;
  };
  content: RichTextField;
};
type Article = {
  id: string;
  title: Field<string>;
  content: RichTextField;
  displayDate: Field<Date>;
  url: { path: string };
};

type TSearchResult = ComponentProps & {
  mainPages: Page[];
  subPages: Page[];
  successStories: SuccessStory[];
  articles: Article[];
};

function extractMainPagesData(rawMainPages: RawMainPage[]) {
  const groupedByUrl: { [href: string]: Page } = {};

  // Group items by href (url.path)
  rawMainPages.forEach((item) => {
    if (item?.parent === null) {
      return;
    }

    const href = item?.parent?.parent.url.path;

    if (!groupedByUrl[href]) {
      groupedByUrl[href] = {
        id: item?.parent?.parent.id,
        displayName: item?.parent?.parent.displayName,
        href,
        dataSearch: '',
      };
    }

    const titleValue = item.title?.value || '';
    const contentValue = item.content?.value || '';

    // Filter out null, empty strings, and duplicates
    if (titleValue && !groupedByUrl[href].dataSearch?.includes(titleValue)) {
      groupedByUrl[href].dataSearch += titleValue;
    }
    if (contentValue && !groupedByUrl[href].dataSearch?.includes(contentValue)) {
      groupedByUrl[href].dataSearch += contentValue;
    }
  });

  const mainPages: Page[] = [];
  let subPages: Page[] = [];
  Object.values(groupedByUrl).forEach((page) => {
    if (page.href?.split('/').length === 2) {
      mainPages.push(page);
    } else {
      subPages.push(page);
    }
  });

  subPages = subPages
    .filter((subPage) => !subPage.href?.includes('Success-Stories'))
    .map((subPage) => {
      const pageNames = subPage.href?.split('/').reverse();
      const mainPageName = (pageNames[2] || pageNames[1]).toUpperCase()?.split('-').join(' ');
      return { ...subPage, displayName: `${subPage.displayName} | ${mainPageName}` };
    });

  return { mainPages, subPages };
}

function groupAndConcatenateContent(inputArray: RawSuccessStory[]) {
  const groupedById: { [parentId: string]: SuccessStory } = {};

  // Group items by id
  inputArray.forEach((item) => {
    const parentId = item?.parent?.parent.id;
    const contentValue = item.content.value || '';

    if (!groupedById[parentId]) {
      groupedById[parentId] = {
        id: item?.parent?.parent.id,
        displayName: item?.parent?.parent.displayName,
        url: item?.parent?.parent.url,
        content: item.content,
      };
    }

    // Concatenate content strings
    groupedById[parentId].content.value += contentValue;
  });

  // Convert groupedById object to an array
  const resultArray = Object.values(groupedById);

  return resultArray;
}

function transformPagesToResultItems(pages: Page[], domain: string): TResultItem[] {
  return pages.map((page) => ({
    id: page.id,
    title: { value: page.displayName.toUpperCase() },
    description: { value: `https://${domain}${page.href}` },
    buttonLink: { value: { href: page.href } },
  }));
}

function transformSuccessStoriesToResultItems(
  successStories: SuccessStory[],
  domain: string
): TResultItem[] {
  return successStories.map((successStory) => ({
    id: successStory.id,
    title: { value: `${successStory.displayName.toUpperCase()} | SUCCESS STORIES` },
    description: { value: `https://${domain}${successStory.url.path}` },
    buttonLink: { value: { href: successStory.url.path } },
  }));
}

function transformArticlesToResultItems(articles: Article[]): TResultItem[] {
  return articles.map((article) => ({
    id: article.id,
    title: { value: `${article.title.value.toUpperCase()} | NEWS & INSIGHTS` },
    description: article.content,
    buttonLink: {
      value: {
        href: article.url.path,
      },
    },
  }));
}

function findFirstIndexGreaterThan(arr: number[], number: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > number) {
      return i;
    }
  }
  return -1; // If no element is greater than the input number
}

export const getStaticProps = async () => {
  try {
    const [mainPagesResult, successStoriesResult, articlesResult] = await Promise.allSettled([
      getMainPages(),
      getSuccessStories(),
      getArticles(),
    ]);

    if (
      mainPagesResult.status === 'fulfilled' &&
      successStoriesResult.status === 'fulfilled' &&
      articlesResult.status === 'fulfilled'
    ) {
      // Both promises were fulfilled, you can now use the data
      const rawMainPages = mainPagesResult.value?.data?.MainPage?.results || [];
      const rawSuccessStories = successStoriesResult.value?.data?.SuccessStory?.results || [];
      const articles: Article[] = articlesResult.value?.data?.pageOne?.results || [];

      // You can further process or manipulate the data here
      const { mainPages, subPages } = extractMainPagesData(rawMainPages);
      const successStories = groupAndConcatenateContent(rawSuccessStories);

      return { mainPages, subPages, successStories, articles };
    } else {
      // At least one of the promises was rejected
      console.error(
        'One or more promises were rejected',
        mainPagesResult,
        successStoriesResult,
        articlesResult
      );
      return {
        mainPages: [],
        subPages: [],
        successStories: [],
        articles: [],
      };
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('An error occurred while fetching data:', error);
    return {
      mainPages: [],
      subPages: [],
      successStories: [],
      articles: [],
    };
  }
};

export default function SearchResult(props: TSearchResult) {
  const PAGE_SIZE = 20;

  const styles = props?.params?.Styles || '';
  const searchParams = useSearchParams();
  const search = searchParams.get('q')?.trim()?.replace(/\s+/g, ' ') ?? '';
  const [resultItems, setResultItems] = useState<TResultItem[]>([]);
  const [numberOfShowMore, setNumberOfShowMore] = useState<number>(PAGE_SIZE);
  const domain = useRef<string>('');

  const handleShowMore = () => {
    setNumberOfShowMore(numberOfShowMore + PAGE_SIZE);
  };

  const escapeSpecialCharacters = (string: string) => {
    const regex = `[]{}()\\^$.?*+]`;
    let resultString = '';

    for (let i = 0; i < string.length; i++) {
      let char = string[i];
      if (regex.indexOf(char) > -1) {
        char = `\\` + char;
      }
      resultString += char;
    }
    return resultString;
  };

  useEffect(() => {
    domain.current = window.location.host;

    setNumberOfShowMore(PAGE_SIZE);

    function stripHtml(html: string) {
      // Use a simple regex to remove HTML tags
      return html.replace(/<[^>]*>/g, '');
    }

    function safeSlice(input: string) {
      const firstIndexOfSpace = input.indexOf(' ');
      return input.slice(firstIndexOfSpace + 1);
    }

    function clustering(html: string) {
      const htmlContent = html.replaceAll('&nbsp;', ' ').replaceAll('\n', ' ');
      const htmlLength = htmlContent.length;
      const minCharacters = 80;
      const substringToFindStart = '<span class="highlight mark">';
      const substringToFindEnd = '</span>';

      // Arrays to store the indices of occurrences
      const startIndexArray = [];
      const endIndexArray = [];

      // Initial search index
      let searchIndex = 0;

      // Loop to find all occurrences of the start substring
      while ((searchIndex = htmlContent.indexOf(substringToFindStart, searchIndex)) !== -1) {
        startIndexArray.push(searchIndex);
        searchIndex += substringToFindStart.length;
      }

      // Reset search index for the end substring
      searchIndex = 0;

      // Loop to find all occurrences of the end substring
      while ((searchIndex = htmlContent.indexOf(substringToFindEnd, searchIndex)) !== -1) {
        endIndexArray.push(searchIndex);
        searchIndex += substringToFindEnd.length;
      }

      const firstIndexStart = startIndexArray[0];
      const firstIndexEnd = endIndexArray[0] + substringToFindEnd.length + minCharacters;
      const firstIndexOfSpaceAfterIndexEnd = htmlContent.slice(firstIndexEnd).indexOf(' ');
      let firstSafeIndexEnd =
        firstIndexOfSpaceAfterIndexEnd !== -1
          ? firstIndexEnd + firstIndexOfSpaceAfterIndexEnd
          : firstIndexEnd;

      if (startIndexArray.length === 1) {
        if (firstIndexEnd > htmlLength) {
          const result = safeSlice(
            htmlContent.slice(firstIndexStart - minCharacters, firstSafeIndexEnd)
          );
          return '...' + result;
        } else {
          return htmlContent.slice(firstIndexStart, firstSafeIndexEnd) + '...';
        }
      } else {
        const indexForSecondCluster = findFirstIndexGreaterThan(startIndexArray, firstSafeIndexEnd);

        if (
          firstSafeIndexEnd <
          startIndexArray[indexForSecondCluster - 1] + substringToFindStart.length
        ) {
          firstSafeIndexEnd = startIndexArray[indexForSecondCluster - 1] - 1;
        }

        if (indexForSecondCluster === -1) {
          if (firstIndexEnd > htmlLength) {
            const result = safeSlice(
              htmlContent.slice(firstIndexStart - minCharacters, firstSafeIndexEnd)
            );
            return '...' + result;
          } else {
            return htmlContent.slice(firstIndexStart, firstSafeIndexEnd) + '...';
          }
        } else {
          const secondIndexStart = startIndexArray[indexForSecondCluster];
          const secondIndexEnd =
            endIndexArray[indexForSecondCluster] + substringToFindEnd.length + minCharacters;
          const secondIndexOfSpaceAfterIndexEnd = htmlContent.slice(secondIndexEnd).indexOf(' ');
          let secondSafeIndexEnd =
            secondIndexOfSpaceAfterIndexEnd !== -1
              ? secondIndexEnd + secondIndexOfSpaceAfterIndexEnd
              : secondIndexEnd;

          const indexForThirdCluster = findFirstIndexGreaterThan(
            startIndexArray,
            secondSafeIndexEnd
          );

          if (
            secondSafeIndexEnd <
            startIndexArray[indexForThirdCluster - 1] + substringToFindStart.length
          ) {
            secondSafeIndexEnd = startIndexArray[indexForThirdCluster - 1] - 1;
          }

          return (
            htmlContent.slice(firstIndexStart, firstSafeIndexEnd) +
            '...' +
            htmlContent.slice(secondIndexStart, secondSafeIndexEnd)
          );
        }
      }
    }

    function searchMatchesForPages(query: string, data: Page[]) {
      if (query.length < 2) {
        return {
          identicalMatches: [],
          nearestMatches: [],
        };
      }

      const regexIdenticalMatches = new RegExp(`\\b${escapeSpecialCharacters(query)}\\b`, 'gi');
      const regexNearestMatches = (template: string) =>
        new RegExp(`\\b${escapeSpecialCharacters(template)}\\w{0,3}\\b`, 'gi');

      // Exclude common words
      const commonWords = ['the', 'a', 'is']; // Add more common words as needed
      const queryWords = query?.split(' ').filter((word) => !commonWords?.includes(word));

      // Search for identical matches in the content field
      const identicalMatches = commonWords.every((word) => query !== word)
        ? data.filter((item) => {
            const dataSearchWithoutHtml = stripHtml(item.dataSearch);
            return dataSearchWithoutHtml.match(regexIdenticalMatches);
          })
        : [];

      // Search for nearest possible matches in the stripped content
      const nearestMatches = data
        .filter((item) => !identicalMatches.some((match) => match.id === item.id)) // Exclude identical matches
        .map((item) => ({
          ...item,
          text: item.dataSearch,
          score: queryWords.reduce(
            (acc, word) =>
              acc + (stripHtml(item.dataSearch).match(regexNearestMatches(word))?.length || 0),
            0
          ),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      return {
        identicalMatches,
        nearestMatches,
      };
    }

    function searchMatchesForSuccessStories(query: string, data: SuccessStory[]) {
      if (query.length < 2) {
        return {
          identicalMatches: [],
          nearestMatches: [],
        };
      }

      const regexIdenticalMatches = new RegExp(`\\b${escapeSpecialCharacters(query)}\\b`, 'gi');
      const regexNearestMatches = (template: string) =>
        new RegExp(`\\b${escapeSpecialCharacters(template)}\\w{0,3}\\b`, 'gi');

      // Exclude common words
      const commonWords = ['the', 'a', 'is']; // Add more common words as needed
      const queryWords = query?.split(' ').filter((word) => !commonWords?.includes(word));

      // Search for identical matches in the content field
      const identicalMatches = commonWords.every((word) => query !== word)
        ? data.filter((item: Article | SuccessStory) => {
            const contentWithoutHtml = stripHtml(item.content.value || '');
            return contentWithoutHtml.match(regexIdenticalMatches);
          })
        : [];

      // Search for nearest possible matches in the stripped content
      const nearestMatches = data
        .filter((item) => !identicalMatches.some((match) => match.id === item.id)) // Exclude identical matches
        .map((item) => ({
          ...item,
          text: item.content.value,
          score: queryWords.reduce(
            (acc, word) =>
              acc +
              (stripHtml(item.content.value || '').match(regexNearestMatches(word))?.length || 0),
            0
          ),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      return {
        identicalMatches,
        nearestMatches,
      };
    }

    function searchMatchesForArticles(query: string, data: Article[]) {
      if (query.length < 2) {
        return {
          identicalMatches: [],
          nearestMatches: [],
        };
      }

      const regexIdenticalMatches = new RegExp(`\\b${escapeSpecialCharacters(query)}\\b`, 'gi');
      const regexNearestMatches = (template: string) =>
        new RegExp(`\\b${escapeSpecialCharacters(template)}\\w{0,3}\\b`, 'gi');
      const highlightTemplate = '<span class="highlight mark">$&</span>';

      // Exclude common words
      const commonWords = ['the', 'a', 'is']; // Add more common words as needed
      const queryWords = query?.split(' ').filter((word) => !commonWords?.includes(word));

      // Search for identical matches in the content field
      const identicalMatches = commonWords.every((word) => query !== word)
        ? data
            .filter((item) => {
              const contentWithoutHtml = stripHtml(item.content.value || '');
              return contentWithoutHtml.match(regexIdenticalMatches);
            })
            .map((item) => {
              const contentWithoutHtml = stripHtml(item.content.value || '');
              const highlightedText = clustering(
                contentWithoutHtml.replace(regexIdenticalMatches, highlightTemplate)
              );
              return { ...item, content: { value: highlightedText } };
            })
        : [];

      // Search for nearest possible matches in the stripped content
      const nearestMatches = data
        .filter((item) => !identicalMatches.some((match) => match.id === item.id)) // Exclude identical matches
        .map((item) => ({
          ...item,
          text: item.content.value,
          score: queryWords.reduce(
            (acc, word) =>
              acc +
              (stripHtml(item.content.value || '').match(regexNearestMatches(word))?.length || 0),
            0
          ),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => {
          // Replace nearest match keywords with HTML highlighting
          const contentWithoutHtml = stripHtml(item.content.value || '');
          const highlightedText = clustering(
            contentWithoutHtml.replace(
              regexNearestMatches(queryWords.join('|')),
              '<span class="highlight mark">$&</span>'
            )
          );
          return { ...item, content: { value: highlightedText } };
        });

      return {
        identicalMatches,
        nearestMatches,
      };
    }

    const { mainPages, subPages, successStories, articles } = props;

    const { identicalMatches: mainPagesIdenticalMatches, nearestMatches: mainPagesNearestMatches } =
      searchMatchesForPages(search, mainPages);
    const { identicalMatches: subPagesIdenticalMatches, nearestMatches: subPagesNearestMatches } =
      searchMatchesForPages(search, subPages);
    const {
      identicalMatches: successStoriesIdenticalMatches,
      nearestMatches: successStoriesNearestMatches,
    } = searchMatchesForSuccessStories(search, successStories);
    const { identicalMatches: articlesIdenticalMatches, nearestMatches: articlesNearestMatches } =
      searchMatchesForArticles(search, articles);

    const mainPagesResultItems = transformPagesToResultItems(
      [...mainPagesIdenticalMatches, ...mainPagesNearestMatches],
      domain.current
    );
    const subPagesResultItems = transformPagesToResultItems(
      [...subPagesIdenticalMatches, ...subPagesNearestMatches],
      domain.current
    );
    const successStoriesResultItems = transformSuccessStoriesToResultItems(
      [
        ...(successStoriesIdenticalMatches as SuccessStory[]),
        ...(successStoriesNearestMatches as SuccessStory[]),
      ],
      domain.current
    );
    const articlesResultItems = transformArticlesToResultItems([
      ...(articlesIdenticalMatches as Article[]),
      ...(articlesNearestMatches as Article[]),
    ]);

    setResultItems([
      ...mainPagesResultItems,
      ...subPagesResultItems,
      ...successStoriesResultItems,
      ...articlesResultItems,
    ]);
  }, [search, props]);

  return (
    <div className={`corp-component component-search-result ${styles}`}>
      {resultItems.length === 0 ? (
        <NoResult query={search} />
      ) : (
        <>
          <SearchCount numberOfShowMore={numberOfShowMore} numberOfResults={resultItems.length} />
          {resultItems.map((resultItem, index) => (
            <ResultItem
              key={resultItem.id}
              id={resultItem.id}
              hide={index >= numberOfShowMore}
              title={resultItem.title}
              description={resultItem.description}
              buttonLink={resultItem.buttonLink}
            />
          ))}
          <div className="article-list-pagination-section">
            <button
              className={`load-more ${numberOfShowMore >= resultItems.length ? ' hide' : ''}`}
              onClick={handleShowMore}
            >
              Explore more
            </button>
          </div>
        </>
      )}
    </div>
  );
}
