import { Field, LinkFieldValue, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

type RecommendationLink = {
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Description: Field<string>;
    Link: Field<LinkFieldValue>;
  };
  id: string;
};

interface ITwoColumnRedirectProps {
  fields: {
    Title: Field<string>;
    Items: RecommendationLink[];
  };
  params: ComponentParams;
}

const TwoColumnRedirect = (props: ITwoColumnRedirectProps): JSX.Element => {
  const { fields } = props;
  const title = fields?.Title?.value;
  const listItems = fields?.Items || [];
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-two-column-redirect corp-12-col ${styles}`}>
      <h2 className="heading-section">{title}</h2>
      <div className="recomendation-link-sections">
        {listItems.map((item) => (
          <div key={item?.id} className="recomendation-link">
            <a
              className="recomendation-link-href"
              href={item?.fields?.Link?.value?.href}
              target={item?.fields?.Link?.value?.target}
            >
              URL
            </a>
            <div className="subtitle">{item?.fields?.Title?.value}</div>
            <div className="title">{item?.fields?.SubTitle?.value}</div>
            <div className="description">{item?.fields?.Description?.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoColumnRedirect;
