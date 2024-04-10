import Link from 'next/link';
import ZpImage from 'components/Common/ZpImage';

type TNoResult = { query: string };

export default function NoResult({ query }: TNoResult) {
  return (
    <div className="zp-search-count-no-result">
      <ZpImage
        image={{ value: { value: { src: '/images/no-results-found.jpg' } } }}
        alt="No Results Found"
        style={{ width: '50%' }}
      />
      <div>
        No result found for <b>{query}</b>.
      </div>
      <div className="homePage__button">
        <Link className="black-link" href="/">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
