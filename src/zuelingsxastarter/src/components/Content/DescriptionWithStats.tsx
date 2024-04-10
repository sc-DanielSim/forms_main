import { Field, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

type Stats = {
  fields: {
    StatMetric: Field<string>;
    StatDescription: Field<string>;
  };
  id: string;
};

interface IDescriptionWithStatsProps {
  fields: {
    SectionDescription: Field<string>;
    StatsList: Stats[];
  };
  params: ComponentParams;
}

function processString(input: string): { paddingCss: string | null; styles: string | null } {
  // Define the patterns to match
  const patterns = /(zp-desc-stats--twelve|zp-desc-stats--ten|zp-desc-stats--eight)/;

  // Use the exec method to find the match in the input string
  const match = patterns.exec(input);

  // Initialize variables
  let paddingCss: string | null = null;
  let styles: string | null = null;

  // If there is a match, set paddingCss and styles accordingly
  if (match) {
    paddingCss = match[0];
    const startIndex = match.index + match[0].length;
    styles = input.substring(startIndex).trim();
  }

  return { paddingCss, styles };
}

const DescriptionWithStats = (props: IDescriptionWithStatsProps): JSX.Element => {
  const { fields } = props;
  const sectionDescription = fields?.SectionDescription?.value;
  const statsList = fields?.StatsList || [];
  const componentStyle = props.params && props.params.Styles ? props.params.Styles : '';
  const { paddingCss, styles } = processString(componentStyle);
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-description-with-stats ${styles}`}>
      <div className={`zp-desc-stats ${paddingCss}`}>
        <div className="zp-desc-stats__desc">{sectionDescription}</div>
        <div className="zp-desc-stats__stats">
          {statsList.map((item) => (
            <div key={item?.id} className="zp-desc-stats__stat-item">
              <div className="zp-desc-stats__stat-metric">{item?.fields?.StatMetric?.value}</div>
              <div className="zp-desc-stats__stat-description">
                {item?.fields?.StatDescription?.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionWithStats;
