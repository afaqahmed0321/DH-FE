/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spaces1 from "../../assets/images/icons/CardIcons/space.svg";
import CustomModal from "../../shared/CustomModal";
import SpaceForm from "../allSpaces/SpaceForm";
import "../../assets/css/home.css";
import "../../assets/css/radio.css";
import { useSelector } from "react-redux";
import "../../assets/css/responsive.css";
export default function Spaces() {
  const categories = useSelector((state) => state.category.categories);

  const [category, setCategory] = useState(
    categories != undefined && Object.keys(categories).length > 0
      ? categories?.subcategories[0]?._id
      : ""
  );

  const [lgShow, setLgShow] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col>
          <div className="NewSpace py-4 my-2 px-3 d-flex align-items-center justify-content-center">
            <div className="spacing px-10 rounded-lg  py-sm-0 py-8 w-100">
              <div className="img d-flex flex-column justify-content-center align-items-center">
                <Image src={Spaces1} className="spacesImg m-auto" alt="" />
                <div className="mt-2 mb-1 text-sm font-medium grey d-flex justify-content-center ">
                  Total Spaces
                </div>
                <div className=" text-36 font-bold black pb-4 d-flex justify-content-center text-26">
                  205
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center w-75">
                  <Button
                    onClick={() => {
                      navigate("dashboard/all-spaces");
                    }}
                    className="btn-blue-outline w-50 w-sm-100 w-md-100 py-20px space-btn-font space-btn-size"
                  >
                    View All Spaces
                  </Button>
                  <Button
                    className="btn-blue mt-3 w-50 w-sm-100 w-md-100 py-20px space-btn-font space-btn-size"
                    onClick={() => setLgShow(true)}
                  >
                    + Add New Space
                  </Button>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </Col>
      </Row>
     
      <CustomModal
        heading="Add New Space"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="new-space-modal new-space-modal"
      >
        <h4 className="text-18 text-black fw-bold">Select Space Type</h4>
        <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
          {categories != undefined &&
            Object.keys(categories).length > 0 &&
            categories?.subcategories.map((cat, index) => {
              return (
                <div key={index}>
                  <Form.Check
                    onChange={() => {
                      setCategory(cat._id);
                    }}
                    inline
                    label={cat.name}
                    name={`group-${index}`}
                    className="m-0 p-0 centered-tabs"
                    type="radio"
                    checked={cat._id === category}
                    id={`inline-radio-${index}`}
                  />
                </div>
              );
            })}
        </div>
        <SpaceForm category={category} onHide={() => setLgShow(false)} />
      </CustomModal>
    </>
  );
}
