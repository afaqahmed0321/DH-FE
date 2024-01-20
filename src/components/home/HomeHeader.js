import React from "react";

import CustomModal1 from "../../shared/CustomModal1";
import CustomerHomeFilterForm from "../customer/filterForm";
import { useState } from "react";
import "../../assets/css/responsive.css";
export default function HomeHeader(props) {
  const [lgShow, setLgShow] = useState(false);
  return (
    <div className="main my-3">
      <div className="content-head d-flex justify-content-between align-items-center">
        <div className={`heading text-24 ${props.class}`}>
          {props.heading}
          <span className="text-primary fst-italic">{props.highlight}</span>
        </div>
        {/**<Button variant="outline-primary" className=" fw-bolder bg-lightBlue" onClick={() => setLgShow(true)}>
          <Image
            alt="gallery"
            src={filterBlue}
            className=" pe-1 text-primary"
          />
          Filter
  </Button>**/}
      </div>
      <CustomModal1
        class1={"d-none"}
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="customer-home-filter"
      >
        <CustomerHomeFilterForm setLgShow={setLgShow} />
      </CustomModal1>
    </div>
  );
}
