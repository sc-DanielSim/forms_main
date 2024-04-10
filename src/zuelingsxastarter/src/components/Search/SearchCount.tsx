type TSearchCount = { numberOfResults: number; numberOfShowMore: number };

export default function SearchCount({ numberOfShowMore, numberOfResults }: TSearchCount) {
  const numberOfShowingResults =
    numberOfShowMore > numberOfResults ? numberOfResults : numberOfShowMore;

  const textContent =
    numberOfResults === 1
      ? 'Showing 1 result'
      : `Showing ${numberOfShowingResults}/${numberOfResults} results`;

  return <div className="zp-search-count">{textContent}</div>;
}
