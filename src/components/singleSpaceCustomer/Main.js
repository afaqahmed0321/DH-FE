import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import "../../assets/css/space-customer.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import phone from "../../assets/images/icons/CardIcons/phone.svg";
import location from "../../assets/images/icons/CardIcons/location.svg";
import space from "../../assets/images/icons/CardIcons/space.svg";
import dollar from "../../assets/images/icons/CardIcons/dollar.svg";
import Rating from "../../assets/images/icons/CardIcons/singlerating.svg";
import CustomModal1 from "../../shared/CustomModal1";
import SpaceCustomerForm from "./SpaceCustomerForm";
import "../../assets/css/home.css";
import ImageGallery from "react-image-gallery";
import PlaceholderImg from "../../assets/images/placeholder.png";
import Toast from "../../shared/Toast";
import { getUserCards } from "../../store/storeIndex";
import "../../assets/css/table.css";
const MainCardCompnent = (props) => {
  const dispatch = useDispatch();

  const singleSpace = useSelector((state) => state.space.singleSpace);
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);

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

  const [lgShow, setLgShow] = useState(false);
  const [slots, setSlots] = useState({ from: "", to: "" });

  const showReservationHandler = () => {
    if (!slots.from || !slots.to) {
      return Toast.error("Select time slots before proceeding");
    }
    setLgShow(true);
  };
  useEffect(() => {
    dispatch(getUserCards(userId, token));
  }, [userId, token, dispatch]);
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <Row className="bg-white py-4 px-3 radius-10">
        <Col lg="12" xl="6" md="12" className="mt-2">
          <ImageGallery
            items={images}
            lazyLoad
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay
          />
        </Col>
        <Col lg="12" xl="6" md="12">
          {/* Header start */}
          <div className="main my-3">
            <div className="content-head d-flex justify-content-between align-items-center card-container">
              <div className={`heading text-36 text-20-r ${props.class}`}>
                {singleSpace?.description}
                <span className="text-primary fst-italic">
                  {props.highlight}
                </span>
              </div>
              <div className="text-black text-20 d-flex align-items-center">
                <Image src={Rating} className="pe-3" />
                <span className="text-20 pt-1">5.0</span>
              </div>
            </div>
          </div>
          {/* Header end */}

          <div className="ps-1 pe-2">

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
                    src={dollar}
                    className=" pe-1 custom-icon"
                  />
                  <span className="ps-2 pe-2">Rate:</span>
                  <span className="text-black text-20 fw-bold">
                    {`$${singleSpace?.rate_hour}`}
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="pt-3 align-items-center">
              <Col className="pe-0">
                <div className="type grey text-20 ">
                  <Image
                    alt="gallery"
                    src={space}
                    className="pe-1 custom-icon"
                  />
                  <span className="ps-2 pe-2">Type:</span>
                  <span className="text-black text-20 fw-bold">
                    {singleSpace?.categoryId?.subcategories[0].name}
                  </span>
                </div>
              </Col>
              <Col className="pe-0 custom-margin">
                <div className="d-flex">
                  <label className="pe-2 custom-label-font fw-bolder">
                    All Facilities:
                  </label>
                  <Image alt="gallery" src={props.icon1} className=" pe-3" />
                  <Image alt="gallery" src={props.icon2} className=" pe-3" />
                  <Image alt="gallery" src={props.icon3} className=" pe-3" />
                  <Image alt="gallery" src={props.icon4} className=" pe-3" />
                </div>
              </Col>
            </Row>
            {Object.keys(singleSpace).length > 0 && (
              <div className="address pt-3 grey text-20">
                <Image alt="gallery" src={location} className=" pe-1  custom-icon"/>
                <span className="ps-2 pe-2">
                {singleSpace.address && singleSpace.address.length > 50
              ? showMore
                ? singleSpace.address
                : `${singleSpace.address.substring(0, 50)}`
              : singleSpace.address}
                  {/* {singleSpace?.address} */}
                  </span>
                  {singleSpace.address && singleSpace.address.length > 50 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="show-more-button "
            >
              {showMore ? "See less" : "See more"}
            </button>
          )}
              </div>
            )}
            <div className="pt-3">
              <div className="pb-2">
                <label className="pe-2 fs-6 fw-bolder">Select Time</label>
              </div>
              <div className="footer row justify-content-between pe-2">
                <div className="col-12 col-sm-9 d-flex align-items-center mb-2 mb-sm-0">
                  <input
                    type="datetime-local"
                    className="time-slot ps-3 pe-3 pt-2 pb-2 rounded-2"
                    onChange={(e) =>
                      setSlots({ ...slots, from: e.target.value })
                    }
                  />
                  <p className="time-slot-to ps-3 pe-3">To</p>
                  <input
                    type="datetime-local"
                    className="time-slot ps-3 pe-3 rounded-2 pt-2 pb-2"
                    onChange={(e) => setSlots({ ...slots, to: e.target.value })}
                  />
                </div>
                <div className="col-12 col-sm-3 d-flex align-items-center">
                  <Button
                    className="reserve-btn"
                    onClick={showReservationHandler}
                  >
                    Reserve Slot
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <hr />
{ Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 &&
          <div className="main my-4">
            <div className="content-head d-flex justify-content-between align-items-center">
              <div className={`heading text-24 ${props.class}`}>
                Managers
                <span className="text-primary fst-italic">
                  {props.highlight}
                </span>
              </div>
            </div>
          </div>
 }         
          <div className="bg-white rounded">
            <Table responsive hover className="" striped>
              <tbody>
                {Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 && singleSpace.managers.map((item, index) => (
                  <tr key={index} className="">
                    <td>
                      <div className="d-flex align-items-center">
                        <Image src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`} width={50} />
                        <p className="p-0 ms-1 mt-3">{item.fullName}</p>
                      </div>
                    </td>
                    <td>{item.phoneNo}</td>
                    <td>{`${item.slot.from} - ${item.slot.to}`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <CustomModal1
        heading="Add New Vehicle"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="new-space-modal new-space-modal"
      >
        <SpaceCustomerForm onHide={() => setLgShow(false)} slots={slots} />
      </CustomModal1>
    </>
  );
};

export { MainCardCompnent };
