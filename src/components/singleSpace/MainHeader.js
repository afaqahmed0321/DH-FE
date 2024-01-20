import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import CustomModal from "../../shared/CustomModal";
import SpaceForm from "../allSpaces/SpaceForm";
import { useSelector } from "react-redux";

import "../../assets/css/radio.css";

      
export default function MainHeader(props) {

  const [lgShow, setLgShow] = useState(false);

  const categories = useSelector(state => state.category.categories);

  const [category, setCategory] = useState(categories !== undefined && Object.keys(categories).length > 0 ? categories?.subcategories[0]?._id : "");

  return (
    <div className="main my-3">
      <div className="content-head d-flex justify-content-between align-items-center">
        <div className={`heading text-18 ${props.class}`}>{props.heading}<span className="text-primary fst-italic">{props.highlight}</span></div>
        <div><Button variant="primary " onClick={() => setLgShow(true)}>+ Add new Space</Button></div>
      </div>

      <CustomModal
        heading="Add New Space"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="new-space-modal new-space-modal"     
      >
        <h4 className="text-18 text-black fw-bold">Select Space Type</h4>
        <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
          {categories !== undefined && Object.keys(categories).length > 0 && categories?.subcategories.map((cat, index) => {
            return <div key={index}>
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
          })}
        </div>
        <SpaceForm category={category} onHide={() => setLgShow(false)} />
      </CustomModal>

    </div>
  );
}
