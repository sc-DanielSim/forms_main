import React, { useEffect, useState } from 'react';
import {
  Field,
  LinkFieldValue,
  ComponentParams,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import useLocalStorage from 'src/hooks/useLocalStorage';

interface ICookiesProps {
  fields?: {
    Content: Field<string>;
    PrivacyPolicy: Field<LinkFieldValue>;
    CookiePolicy: Field<LinkFieldValue>;
    AcceptButtonText: Field<string>;
  };
  params?: ComponentParams;
}

const Cookies = (props: ICookiesProps): JSX.Element => {
  const { fields } = props;
  const styles = props.params?.Styles || '';
  const ACCEPT_COOKIES_NAME = 'acceptedCookies';
  const ACCEPT_COOKIES_VAL = '1';
  const content = fields?.Content;

  const [acceptCookie, setAcceptCookie] = useState<boolean>(true);
  const [acceptCookieStorage, setAcceptCookieStorage] = useLocalStorage(ACCEPT_COOKIES_NAME, '');

  useEffect(() => {
    setAcceptCookie(!!+acceptCookieStorage);
  }, [acceptCookieStorage]);

  const handleAcceptCookie = () => {
    const isAccept = acceptCookieStorage && +acceptCookieStorage;
    if (!isAccept) {
      setAcceptCookieStorage(ACCEPT_COOKIES_VAL);
    }
  };

  if (!acceptCookie) {
    return (
      <div
        className={`corp-component component-cookies${
          +acceptCookieStorage ? ' hide' : ''
        } ${styles}`}
      >
        <div className="zp_cookie__text">
          <JssRichText className="rich-text__content" field={content} />
        </div>
        <button className="zp-cookie__close" onClick={handleAcceptCookie}>
          {fields?.AcceptButtonText.value}
        </button>
      </div>
    );
  }

  return <></>;
};

export default Cookies;
