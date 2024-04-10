import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import ZpLink from 'components/Common/ZpLink';

type TLink = {
  displayName: string;
  name: Field<string>;
  url: {
    path: string;
  };
  id: string;
  NavigationTitle: Field<string>;
};

type TBreadcrumb = {
  fields: {
    data: {
      item: {
        LinkStyle: {
          value: string;
        };
        ancestors: TLink[];
      };
    };
  };
};

const Breadcrumb = (props: TBreadcrumb): JSX.Element => {
  const { fields } = props;
  const linkStyle = fields?.data?.item?.LinkStyle?.value;
  const ancestors = fields?.data?.item?.ancestors || [];
  const reversedAncestors = [...ancestors].reverse();
  let linkColor: string;
  if (linkStyle === 'Style 1') {
    linkColor = '#8E8F8F';
  } else {
    linkColor = '#FFFFFF';
  }

  return (
    <div className="corp-component component-breadcrumb zp-corporate-breadcrumb-section corp-12-col">
      <ul className="breadcrumb-list" style={{ color: linkColor }}>
        <li className="breadcrumb-list-item">
          {reversedAncestors.length > 0 ? (
            reversedAncestors.map((item, index) => (
              <ZpLink
                key={index}
                btnLink={{ value: { href: item?.url?.path } }}
                className="breadcrumb-list-link"
                style={{ color: linkColor }}
              >
                {item?.NavigationTitle?.value}
              </ZpLink>
            ))
          ) : (
            <span>&nbsp;</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
