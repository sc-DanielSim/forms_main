import { ComponentParams, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface IIndustriesSectionProps {
  fields?: {
    data?: {
      IndustriesSection?: {
        Description?: Field<string>;
        ListItem?: {
          targetItem?: {
            name?: string;
            children?: {
              results: {
                Title?: string;
                url?: {
                  path: string;
                };
              }[];
            };
          };
        };
      };
    };
  };
  params: ComponentParams;
}

const IndustriesSection = (props: IIndustriesSectionProps): JSX.Element => {
  const industriesSection = props.fields?.data?.IndustriesSection;
  const listItems = props.fields?.data?.IndustriesSection?.ListItem?.targetItem?.children?.results;
  const styles = props.params?.Styles || '';

  return (
    <div className={`corp-component component-segments ${styles}`}>
      <div className="zp-corporate-industries-list-section corp-12-col mb-0">
        <div className="description">{industriesSection?.Description?.value}</div>
        <div className="industries-list-section">
          <ul className="industries-list">
            {listItems?.map((item, index) => (
              <li key={index} className="industries-list-item">
                <Link className="list-item-lbl" href={item.url?.path || '/'}>
                  {item.Title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;
