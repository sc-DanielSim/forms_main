import React, { useEffect, useRef, useState } from 'react';
import { Field, LinkFieldValue, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type TContactCatalog = {
  id: string;
  fields: {
    ButtonText: Field<string>;
    ButtonLink: Field<LinkFieldValue>;
  };
};

type ICTAContactUsHeadingProps = ComponentProps & {
  fields?: {
    ButtonText: Field<string>;
    Header: Field<string>;
    DropDownTitle: Field<string>;
    ListItems: TContactCatalog[];
  };
};

const CTAContactUsHeading = (props: ICTAContactUsHeadingProps): JSX.Element => {
  const { fields } = props;
  const styles = props.params?.Styles || '';
  const buttonText = fields?.ButtonText?.value;
  const dropDownTitle = fields?.DropDownTitle?.value || '';
  const listItems = fields?.ListItems ?? [];
  const [showDropDown, setShowDropDown] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [redirectLink, setRedirectLink] = useState<string | undefined>('#');
  const [dropDown, setDropDown] = useState(dropDownTitle);
  const boxRef = useRef<HTMLDivElement>(null);

  function UpdateDropDownValue(dropDownTitle: string, link: string | undefined) {
    setDropDown(dropDownTitle);
    setRedirectLink(link);
    setDisableButton(false);
  }

  useEffect(() => {
    function handleClickBox(event: MouseEvent) {
      if (boxRef.current && boxRef.current.contains(event.target as Node)) {
        setShowDropDown((current) => !current);
      } else {
        setShowDropDown(false);
      }
    }
    document.addEventListener('mouseup', handleClickBox);
    return () => {
      document.removeEventListener('mouseup', handleClickBox);
    };
  }, []);

  if (!fields) {
    return <></>;
  }

  return (
    <div className={`corp-component component-cta-contact-us-heading ${styles}`}>
      <div className="corp-12-col contactus-text-btn-section">
        <Text field={fields?.Header} tag="h3" className="text-column" />
        <div className="corp-dropdown-section">
          <div id="link-dropdown" className="corp-dropdown" ref={boxRef}>
            <span className="select-span">{dropDown}</span>
          </div>
          <ul className={`corp-dropdown-list${showDropDown ? ' is-display' : ''}`}>
            {listItems.map((item) => (
              <li
                key={item.id}
                className="corp-dropdown-list-item"
                data-link={item.fields.ButtonLink?.value.href}
                onClick={() =>
                  UpdateDropDownValue(
                    item.fields.ButtonText?.value,
                    item.fields.ButtonLink?.value.href
                  )
                }
              >
                <span className="contactCategory">{item.fields.ButtonText?.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={disableButton ? 'btn-section-disabled' : 'btn-section'}>
          <a
            href={redirectLink}
            className={disableButton ? 'btn-section-link-disabled' : 'btn-section-link'}
          >
            <span>{buttonText}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTAContactUsHeading;
