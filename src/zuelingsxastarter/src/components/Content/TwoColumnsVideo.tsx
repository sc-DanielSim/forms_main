import { useState } from 'react';
import {
  Field,
  ImageField,
  LinkFieldValue,
  ComponentParams,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ZpImage from 'components/Common/ZpImage';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';

interface ITwoColumnsVideoProps {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: Field<ImageField>;
    VideoLink: Field<LinkFieldValue>;
  };
  params: ComponentParams;
}

const TwoColumnsVideo = (props: ITwoColumnsVideoProps): JSX.Element => {
  const { fields } = props;
  const styles = props.params && props.params.Styles ? props.params.Styles : '';
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (!fields) return <></>;
  return (
    <div className={`corp-component component-two-columns-video ${styles}`}>
      <section className="portlet">
        <div className="portlet-content">
          <div className=" portlet-content-container">
            <div className="portlet-body">
              <div className="zp-corporate-featured-video-section corp-12-col">
                <div className="img-section">
                  <ZpImage image={fields?.Image} className="featured-img" />
                  <Image
                    className="video-play-icon"
                    alt="play icon"
                    src="../images/play-icon.svg"
                    onClick={handleShow}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="content-section">
                  <h4 className="title">
                    <Text field={fields?.Title} />
                  </h4>
                  <div className="description">
                    <Text field={fields?.Description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose} className="video-modal" centered>
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
          <div className="modal-video-wrapper">
            <iframe
              src={fields?.VideoLink?.value?.href}
              className="video-iframe"
              allowFullScreen={true}
              title="youtube video"
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TwoColumnsVideo;
