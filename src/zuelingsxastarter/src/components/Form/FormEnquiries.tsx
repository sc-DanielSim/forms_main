'use client';

import { MailDataRequired } from '@sendgrid/mail';
import { ComponentParams, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { EMAIL_FORM_REGEX } from 'src/constants/emailConst';
import { TJsonVal, TJsonChildren, TJsonValBase } from 'src/types/jsonvalue';
import moment from 'moment';
// import { ENQUIRIES_FORM_DATA } from 'src/mocks/demoData';

type TDropdown = {
  jsonValue: {
    id: string;
    fields: {
      Value: Field<string>;
      Title: Field<string>;
    };
  };
};
interface IFormEnquiriesProps {
  fields: {
    data: {
      datasource: {
        SubTitle: TJsonVal;
        SubmitButtonText: TJsonVal;
        SubmitEnpoint: TJsonVal;
        NameSend: TJsonVal;
        EmailSend: TJsonVal;
        SubmitApiKey: TJsonVal;
        SubmitApiToken: TJsonVal;
        SuccessUrlRedirect: {
          jsonValue: {
            value: {
              href: string;
            };
          };
        };
        Body: TJsonVal;
        Bcc: TJsonVal;
        Subject: TJsonVal;
      } & TJsonChildren;
      emailsend: {
        children?: {
          results: {
            Market: TDropdown;
            Categories: {
              results: {
                Category: TDropdown;
                To: TJsonVal;
              }[];
            };
          }[];
        };
      };
    };
  };
  params: ComponentParams;
}

const FormEnquiries = (props: IFormEnquiriesProps): JSX.Element => {
  // console.log('FormEnquiries props', props);
  // const fakePropsFields = ENQUIRIES_FORM_DATA?.data;
  // const data = fakePropsFields.datasource;

  const data = props?.fields?.data?.datasource;
  const FNAME_NAME = 'Name';
  const FNAME_EMAIL = 'Email';
  const FNAME_CATEGORY = 'Category';
  const FNAME_MARKET = 'Market';
  const FNAME_MESSAGE = 'Message';
  const FNAME_POLICY = 'Policy';
  const REQUIRED_HTML_CLS = 'required-field-lbl';

  const [STATE_INVALID, STATE_VALID, STATE_UNSET] = [0, 1, 2];

  // form - name
  const [name, setName] = useState<string>();
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value?.trim());
  };

  // form - email
  const [validEmailState, setValidEmailState] = useState<number>(STATE_UNSET);
  const [email, setEmail] = useState<string>();
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailVal = event.target.value.trim();
    if (emailVal === '' || emailVal === null || !EMAIL_FORM_REGEX.test(emailVal)) {
      setValidEmailState(STATE_INVALID);
    } else {
      setValidEmailState(STATE_VALID);
      setEmail(emailVal);
    }
  };

  // form - categories dropdown
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const categoryField = data?.children?.results?.filter(
    (item) => item.FieldName?.jsonValue.value === FNAME_CATEGORY
  )[0];
  const categoryList = categoryField?.Source?.value?.children?.results?.map(
    (item: TJsonValBase) => item.Value?.jsonValue?.value
  );

  const [selectedCategory, setSelectedCategory] = useState(
    categoryField?.Placeholder?.jsonValue?.value
  );
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleShowCategoryDropdown = () => {
    setShowCategoryDropdown(true);
  };
  const handleSelectCategoryDropdown = (item: string) => {
    setSelectedCategory(item);
    setShowCategoryDropdown(false);
  };

  // form - markets dropdown
  const marketDropdownRef = useRef<HTMLDivElement>(null);
  const marketField = data?.children?.results?.filter(
    (item) => item?.FieldName?.jsonValue?.value === FNAME_MARKET
  )[0];
  const marketList = marketField?.Source?.value?.children?.results?.map(
    (item) => item?.Value?.jsonValue?.value
  );

  const [selectedMarket, setSelectedMarket] = useState(
    marketField?.Placeholder?.jsonValue?.value || ''
  );
  const [showMarketsDropdown, setShowMarketsDropdown] = useState(false);

  const handleShowMarketsDropdown = () => {
    setShowMarketsDropdown(true);
  };
  const handleSelectMarketsDropdown = (item: string) => {
    setSelectedMarket(item);
    setShowMarketsDropdown(false);
  };

  // form - message
  const [message, setMessage] = useState<string>();
  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value.trim());
  };

  // form - checkbox
  const termsCheckRef = useRef<HTMLInputElement>(null);
  const [isCheckedTerms, setIsCheckedTerms] = useState<boolean>(false);
  const handleChangeTermCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxVal = event.target.checked;
    setIsCheckedTerms(checkboxVal);
  };

  // form
  const router = useRouter();
  const [validEnquiryForm, setValidEnquiryForm] = useState<boolean>(false);
  const handleSubmitEnquiry = async (event: React.FormEvent) => {
    event.preventDefault();

    const currentDate = moment(new Date()).format('D MMMM YYYY');
    let emailContent: string = data?.Body?.jsonValue?.value || '';
    emailContent = emailContent
      .replace('#NAME_TYPE#', name || '')
      .replace('#EMAIL_TYPE#', email || '')
      .replace('#MARKET_TYPE#', selectedMarket || '')
      .replace('#CATEGORY_TYPE#', selectedCategory || '')
      .replace('#MESSAGE_TYPE#', message || '')
      .replace('#DATETIME#', currentDate || '');

    const bccEmails = data?.Bcc?.jsonValue?.value || '';

    const emailData = {
      to: emailSendTo?.split(',') || '',
      bcc: bccEmails?.split(',') || '',
      from: {
        email: data?.EmailSend?.jsonValue?.value,
        name: data?.NameSend?.jsonValue?.value,
      },
      subject: data?.Subject?.jsonValue?.value,
      html: emailContent,
    };
    const res = sendApiSendgrid(emailData);
    const redirectUrl = data?.SuccessUrlRedirect?.jsonValue?.value?.href;

    res.then((res) => {
      if (!!redirectUrl && res?.ok) {
        router.push(redirectUrl);
      }
    });
  };

  // Get recipients
  const [emailSendTo, setEmailSendTo] = useState<string>('');
  const emailObjects = props?.fields?.data?.emailsend?.children?.results;
  useEffect(() => {
    const emailObj = emailObjects?.filter(
      (item) => item?.Market?.jsonValue?.fields?.Value?.value === selectedMarket
    )[0];

    let cat;
    if (emailObj) {
      cat = emailObj?.Categories?.results?.filter(
        (cat) => cat?.Category?.jsonValue?.fields?.Value?.value === selectedCategory
      )[0];
    }

    if (cat) {
      setEmailSendTo(cat?.To?.jsonValue?.value);
    }
    // eslint-disable-next-line
  }, [selectedCategory, selectedMarket]);

  const sendApiSendgrid = async (data: MailDataRequired | MailDataRequired[]) => {
    const url = '/api/handleSendgrid';
    const options = {
      method: 'POST',
      headers: {
        'conten-type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetch(url, options);
  };

  // Close dropdown when click out side
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!categoryDropdownRef?.current?.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      } else {
        setShowMarketsDropdown(false);
      }
      if (!marketDropdownRef?.current?.contains(event.target as Node)) {
        setShowMarketsDropdown(false);
      } else {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setValidEnquiryForm(
      !!(
        name &&
        validEmailState === STATE_VALID &&
        categoryList?.includes(selectedCategory) &&
        marketList?.includes(selectedMarket) &&
        isCheckedTerms &&
        message
      )
    );
    // eslint-disable-next-line
  }, [
    name,
    validEmailState,
    selectedCategory,
    categoryList,
    selectedMarket,
    marketList,
    isCheckedTerms,
    message,
  ]);
  if (!data?.children?.results) return <></>;
  return (
    <div className="corp-component component-form-enquiries zp-corporate-forms corp-8-col">
      <div className="form-subtitle">{data?.SubTitle?.jsonValue?.value}</div>
      <Form className="corporate-form contact-us-form" onSubmit={handleSubmitEnquiry}>
        {data?.children?.results?.map((item, index) => {
          const fieldName = item?.FieldName?.jsonValue?.value;
          const isRequired = item?.Required?.jsonValue?.value;

          if (fieldName === FNAME_NAME) {
            return (
              <Form.Group key={index}>
                <Form.Label className={`${isRequired ? REQUIRED_HTML_CLS : ''}`}>
                  {fieldName}
                </Form.Label>
                <Form.Control
                  className="form-field contact-full-name"
                  required
                  onChange={handleChangeName}
                />
              </Form.Group>
            );
          } else if (fieldName === FNAME_EMAIL) {
            return (
              <Form.Group key={index}>
                <Form.Label className={`${isRequired ? REQUIRED_HTML_CLS : ''}`}>
                  {fieldName}
                </Form.Label>
                <Form.Control
                  className="form-field contact-email"
                  required
                  onChange={handleChangeEmail}
                />
                <Form.Text className={`err-msg${validEmailState === STATE_INVALID ? '' : ' hide'}`}>
                  *{item?.Validations?.results[0]?.Message?.jsonValue?.value}
                </Form.Text>
              </Form.Group>
            );
          } else if (fieldName === FNAME_CATEGORY || fieldName === FNAME_MARKET) {
            const isCategory: boolean = fieldName === FNAME_CATEGORY;
            return (
              <Form.Group key={index}>
                <Form.Label className={`${isRequired ? REQUIRED_HTML_CLS : ''}`}>
                  {fieldName}
                </Form.Label>
                <input type="text" className="d-none is-required select-field contact-category" />
                <div className="corp-dropdown-section">
                  <div
                    ref={isCategory ? categoryDropdownRef : marketDropdownRef}
                    className="corp-dropdown"
                    onClick={isCategory ? handleShowCategoryDropdown : handleShowMarketsDropdown}
                  >
                    <span
                      className={`select-span${
                        (isCategory ? categoryList : marketList)?.includes(
                          isCategory ? selectedCategory : selectedMarket
                        )
                          ? ' selected'
                          : ''
                      }`}
                    >
                      {isCategory ? selectedCategory : selectedMarket}
                    </span>
                  </div>
                  <ul
                    className={`corp-dropdown-list${
                      (isCategory ? showCategoryDropdown : showMarketsDropdown) ? ' is-display' : ''
                    }`}
                  >
                    {(isCategory ? categoryList : marketList)?.map((item, index) => (
                      <li
                        key={index}
                        className="corp-dropdown-list-item"
                        onClick={() =>
                          isCategory
                            ? handleSelectCategoryDropdown(item)
                            : handleSelectMarketsDropdown(item)
                        }
                      >
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Form.Group>
            );
          } else if (fieldName === FNAME_MESSAGE) {
            return (
              <Form.Group key={index}>
                <Form.Label className={`${isRequired ? REQUIRED_HTML_CLS : ''}`}>
                  {fieldName}
                </Form.Label>
                <Form.Control
                  className="form-control additional-info-field"
                  as="textarea"
                  rows={6}
                  required
                  onChange={handleChangeMessage}
                />
              </Form.Group>
            );
          } else if (fieldName === FNAME_POLICY) {
            return (
              <Form.Group key={index} controlId="checkboxTerm">
                <div className="form-checkbox-section">
                  <input
                    ref={termsCheckRef}
                    id="form-checkbox"
                    className="is-required form-checkbox contact-consent"
                    type="checkbox"
                    onChange={handleChangeTermCheck}
                  />
                  <div className="checkbox-lbl-section">
                    <label
                      htmlFor="form-checkbox"
                      className={`${isRequired ? REQUIRED_HTML_CLS : ''} form-check-label`}
                    >
                      {item?.Title?.jsonValue?.value}
                    </label>
                  </div>
                </div>
              </Form.Group>
            );
          } else {
            return <h5 key={index}>.</h5>;
          }
        })}
        <Button className="form-submit-btn" type="submit" disabled={!validEnquiryForm}>
          {data?.SubmitButtonText?.jsonValue?.value}
        </Button>
        <div className="clear-both"></div>
      </Form>
    </div>
  );
};

export default FormEnquiries;
