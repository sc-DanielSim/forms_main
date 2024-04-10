import { useState } from 'react';
import Image from 'next/image';
import { Field, ComponentParams, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Accordion as BootstrapAccordion, Card } from 'react-bootstrap';

interface IAccordionProps {
  fields: {
    data?: {
      datasource?: {
        children?: {
          results: {
            Title?: Field<string>;
            Content?: Field<string>;
          }[];
        };
      };
    };
  };
  params?: ComponentParams;
}

const Accordion = (props: IAccordionProps): JSX.Element => {
  const { fields } = props;
  const styles = props.params?.Styles || '';
  const [currentOpen, setCurrentOpen] = useState<number>();
  const items = fields.data?.datasource?.children?.results;

  const handleClickAccordion = (index: number) => {
    if (index === currentOpen) {
      setCurrentOpen(undefined);
    } else {
      setCurrentOpen(index);
    }
  };

  return (
    <div className={`corp-component component-accordion ${styles}`}>
      <BootstrapAccordion>
        {items?.map((item, index) => (
          <div
            key={index}
            className="zp-corporate-accordion-container zp-corporate-accordion--12-col"
          >
            <div className="panel-group zp-corporate-accordion">
              <div className="panel panel-default">
                <Card>
                  <BootstrapAccordion.Toggle
                    as={Card.Header}
                    eventKey={`${index}`}
                    onClick={() => handleClickAccordion(index)}
                  >
                    <div className="panel-heading">
                      <div
                        className={`accordion-panel-link ${
                          index !== currentOpen ? 'collapsed' : ''
                        }`}
                      >
                        <div>{item.Title?.value}</div>
                        <Image
                          className="arrow-up-img"
                          src="/images/arrow-up.svg"
                          alt="accordion-expand"
                          width={15}
                          height={15}
                        />
                      </div>
                    </div>
                  </BootstrapAccordion.Toggle>
                  <BootstrapAccordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                      <div className="panel-collapse collapse in show">
                        <div className="panel-body">
                          <JssRichText className="rich-text__content" field={item.Content} />
                        </div>
                      </div>
                    </Card.Body>
                  </BootstrapAccordion.Collapse>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </BootstrapAccordion>
    </div>
  );
};

export default Accordion;
