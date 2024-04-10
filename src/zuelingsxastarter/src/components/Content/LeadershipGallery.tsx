import React from 'react';
import { useState } from 'react';
import {
  Field,
  LinkFieldValue,
  ComponentParams,
  ImageField,
  RichTextField,
  RichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Modal from 'react-bootstrap/Modal';
import ZpImage from 'components/Common/ZpImage';
import ZpLink from 'components/Common/ZpLink';
import Image from 'next/image';

type Leaders = {
  id: string;
  fields: {
    ButtonText: Field<string>;
    ButtonLink: Field<LinkFieldValue>;
    Description: RichTextField;
    Designation: Field<string>;
    Name: Field<string>;
    Image: Field<ImageField>;
  };
};

interface ILeadershipGalleryProps {
  fields: {
    Leaders: Leaders[];
  };
  params: ComponentParams;
}

const LeadershipGallery = (props: ILeadershipGalleryProps): JSX.Element => {
  const { fields } = props;
  const leaderList = fields?.Leaders || [];
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  const [show, setShow] = useState(false);
  const [activeLeader, setActiveLeader] = useState<Leaders>();

  const handleClose = () => setShow(false);
  const handleShow = (id: string) => {
    setShow(true);
    const dataList = leaderList.filter((leader) => leader?.id === id);
    if (dataList.length > 0) {
      setActiveLeader(dataList[0]);
    }
  };
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-leadership-gallery ${styles}`}>
      <div className="zp-corporate-leadership-gallery corp-12-col">
        <div className="leadership-gallery-list corp-grid-layout des-3-col tab-2-col">
          {leaderList?.length > 0 &&
            leaderList.map((item) => (
              <div key={item?.id}>
                <div className="leadership-gallery-item">
                  <ZpImage image={item?.fields?.Image} className="leadership-img" />
                  <div className="heading-section" onClick={() => handleShow(item?.id)}>
                    <h4 className="title">{item?.fields?.Name?.value}</h4>
                    <Image
                      className="expand-icon"
                      src="../images/expand-icon-black.svg"
                      loading="lazy"
                      alt="expand icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="subtitle">{item?.fields?.Designation?.value}</div>
                  <ZpLink btnLink={item?.fields?.ButtonLink} className="linkedin-link">
                    {item?.fields?.ButtonText?.value}
                  </ZpLink>
                  <div className="description hide">{item?.fields?.Description?.value}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="leadership-detail-model" centered>
        <Modal.Body>
          <button className="close" onClick={handleClose}>
            <Image
              className="close-icon"
              alt="close modal"
              src="../images/close-icon-black.svg"
              width={15}
              height={15}
            />
          </button>
          {}
          <div className="detail-section">
            <div className="img-section">
              <JssImage
                field={activeLeader?.fields?.Image?.value}
                className="leadership-modal-img"
                alt="leadership gallery image"
              />
              <div className="title">{activeLeader?.fields?.Name?.value}</div>
              <div className="subtitle">{activeLeader?.fields?.Designation?.value}</div>
            </div>
            <RichText
              className="description-section rich-text__content"
              field={activeLeader?.fields?.Description}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeadershipGallery;
