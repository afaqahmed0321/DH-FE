import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import "../../assets/css/space-card.css";
import { Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import phone from "../../assets/images/icons/CardIcons/phone.svg";
import flag from "../../assets/images/icons/CardIcons/flag.svg";
import location from "../../assets/images/icons/CardIcons/location.svg";
import space from "../../assets/images/icons/CardIcons/space.svg";
import dollar from "../../assets/images/icons/CardIcons/dollar.svg";
import ImageGallery from "react-image-gallery";
import PlaceholderImg from "../../assets/images/placeholder.png";

const MainCardCompnent = (props) => {
  const singleSpace = useSelector((state) => state.space.singleSpace);

  const images =
    Object.keys(singleSpace).length > 0
      ? singleSpace?.images.map((img) => {
        return {
          original: `${process.env.REACT_APP_SERVER_URL}${img}`,
          thumbnail: `${process.env.REACT_APP_SERVER_URL}${img}`,
        };
      })
      : [
          {
            original: PlaceholderImg,
            thumbnail: PlaceholderImg,
          },
        ];

  const [isOn, setIsOn] = useState(singleSpace?.available);
  const handleClick = () => {
    setIsOn(!isOn);
  };
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <Row className="bg-white py-4 px-3 radius-10">
        <Col lg="12" xl="6" className="mt-2">
          <ImageGallery
            items={images}
            lazyLoad
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay
          />
        </Col>
        <Col>
          {/* Header start */}
          <div className="main my-1">
            <div className="content-head d-sm-flex d-block justify-content-between align-items-center">
              <div className={`heading text-36 ${props.class}`}>
                {singleSpace?.description}
                <span className="text-primary fst-italic">
                  {props.highlight}
                </span>
              </div>
              <div className="text-black text-20 d-flex align-items-center w-25 justify-content-start">
                <div className="text-black text-20 d-flex align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      onClick={handleClick}
                      checked={isOn}
                    />
                  </div>
                </div>
                {isOn ? "Available" : "Unavailable"}
              </div>
            </div>
            {/* Header end */}

            <div className="ps-1 pe-2 mt-4">
              <Row>
                <Col sm="6" className="pe-0">
                  <div className="phone pt-3 grey text-20">
                    <Image
                      alt="gallery"
                      src={phone}
                      className=" pe-1 custom-icon"
                    />
                    <span className="ps-2 pe-2">{singleSpace?.contact}</span>
                  </div>
                </Col>
                <Col className="pe-0">
                  <div className="capacity pt-3 grey text-20">
                    <Image
                      alt="gallery"
                      src={flag}
                      className=" pe-1 custom-icon"
                    />
                    <span className="ps-2 pe-2">Capacity:</span>
                    <span className="text-black text-20 fw-bold">
                      {singleSpace?.capacity}     
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="pt-3 ">
                <Col sm="6" className="pe-0">
                  <div className="type grey text-20 ">
                    <Image
                      alt="gallery"
                      src={space}
                      className=" pe-1 custom-icon"
                    />
                    <span className="ps-2 pe-2">Type:</span>
                    <span className="text-black text-20 fw-bold">
                      {singleSpace?.categoryId?.subcategories[0].name}
                    </span>
                  </div>
                </Col>
                <Col className="pe-0">
                  <div className="rate grey text-20">
                    <Image
                      alt="gallery"
                      src={dollar}
                      className=" pe-1 custom-icon"
                    />
                    <span className="ps-2 pe-2">Rate:</span>
                    <span className="text-black text-20 fw-bold">{`$${singleSpace?.rate_hour}`}</span>
                  </div>
                </Col>
              </Row>

              {Object.keys(singleSpace).length > 0 && (
                <div className="address pt-3 grey text-20">
                  <Image alt="gallery" src={location} className=" pe-1 custom-icon"/>
                  <span className="custom-lineheight">
            {singleSpace.address && singleSpace.address.length > 30
              ? showMore
                ? singleSpace.address
                : `${singleSpace.address.substring(0, 30)}`
              : singleSpace.address}
          </span>
          {singleSpace.address && singleSpace.address.length > 30 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="show-more-button "
            >
              {showMore ? "See less" : "See more"}
            </button>
          )}
                </div>
              )}

              <div className="footer d-flex justify-content-between pe-2 py-3">
                <div className="d-flex">
                  <label className="pe-2 text-20 fw-bolder">
                  All Facilities:
                  </label>
                  <Image alt="gallery" src={props.icon1} className=" pe-3" />
                  <Image alt="gallery" src={props.icon2} className=" pe-3" />
                  <Image alt="gallery" src={props.icon3} className=" pe-3" />
                  <Image alt="gallery" src={props.icon4} className=" pe-3" />
                </div>
              </div>
            </div>
            <hr />
{Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 &&
            <div className="main my-2">
              <div className="content-head d-flex justify-content-between align-items-center">
                <div className={`heading text-24 ${props.class}`}>
                  Managers
                  <span className="text-primary fst-italic">
                    {props.highlight}
                  </span>
                </div>
              </div>
            </div>

}            <div className="bg-white rounded custom-table1">
              <Table responsive hover className="" striped>
                <tbody>
                  {Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 && singleSpace.managers.map((item, index) => (

                    
                    <tr key={index} className="">
                      <td>
                        <div className="d-flex align-items-center">
                          <Image src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`} width={50} />
                          <p className="p-0 ms-2">{item.fullName}</p>
                        </div>
                      </td>
                      <td>{item.phoneNo}</td>
                      <td>{`${item.slot.from} - ${item.slot.to}`}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          </div>
        </Col>
      </Row>
    </>
  );
};

export { MainCardCompnent };
