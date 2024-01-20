import React from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import filterBlue from "../../assets/images/icons/filterBlue.svg";
import "../../assets/css/responsive.css";

export default function BookingHeader() {
  const navigate = useNavigate();
  return (
    <div className="main my-3">
      <div className="content-head d-flex justify-content-between align-items-center">
        <div className="heading text-24">My Bookings</div>
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-primary"
            className=" fw-bolder bg-lightBlue booking-btn"
          >
            <Image
              alt="gallery"
              src={filterBlue}
              className=" pe-1 text-primary"
            />
            Filter
          </Button>
          <Button
            onClick={() => {
              navigate("dashboard/bookings");
            }}
            variant="primary"
            className="booking-btn"
          >
            View All
          </Button>
        </div>
      </div>
    </div>
  );
}
