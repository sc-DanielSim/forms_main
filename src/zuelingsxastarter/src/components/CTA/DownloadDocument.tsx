import React from 'react';
import { LinkField, TextField, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import Image from 'next/image';

type DownloadDocumentLink = {
  Link: {
    jsonValue: LinkField;
  };
  Title: {
    jsonValue: TextField;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: DownloadDocumentLink[];
      };
    };
  };
}
interface IDownloadDocumentProps {
  fields: Fields;
  params: ComponentParams;
}

const DownloadDocument = (props: IDownloadDocumentProps): JSX.Element => {
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  const data = props.fields?.data?.datasource;

  if (!data) {
    return <div className={`corp-component component-download-document ${styles}`}></div>;
  }

  const list = data.children.results;

  return (
    <div className={`corp-component component-download-document ${styles}`}>
      {list.map((element: DownloadDocumentLink, idx: number) => (
        <div key={idx} className="zp-corporate-reports-component corp-10-col">
          <div className="report-content-section">
            <label className="title">{element.Title?.jsonValue?.value ?? ''}</label>
            <Link
              href={element.Link?.jsonValue?.value?.href ?? '/'}
              className="report-download-link report-link"
              target="_blank"
            ></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TwoColumns = (props: IDownloadDocumentProps): JSX.Element => {
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  const data = props.fields?.data?.datasource;

  if (!data) {
    return <div className={`corp-component component-download-document ${styles}`}></div>;
  }

  const list = data.children.results;

  return (
    <div className={`corp-component component-download-document ${styles}`}>
      <div className="zp-corporate-code-of-conduct-files">
        <ul className="file-list">
          {list.map((element: DownloadDocumentLink, idx: number) => (
            <li key={idx} className="file-list-item">
              <div className="file-download-section">
                <span className="file-list-item-lbl">{element.Title?.jsonValue?.value}</span>
                <a
                  className="file-download-link"
                  href={element.Link?.jsonValue?.value?.href ?? '/'}
                >
                  <Image
                    src="/images/common/download-icon.svg"
                    className="file-download-icon"
                    alt="download-link"
                    width={20}
                    height={21}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadDocument;
