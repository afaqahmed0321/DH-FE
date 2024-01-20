import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DashboardCard from "../home/DashboardCard";
import Booking from "../../assets/images/icons/totalbooking.svg";
import Cancel from "../../assets/images/icons/cancelpayment.svg";
import Payment from "../../assets/images/icons/paidbooking.svg";
import Total from "../../assets/images/icons/total.svg";
import "../../assets/css/dashboard-misc.css";
import BookingTable from "./BookingTable";
import CustomModal1 from "../../shared/CustomModal1";
import PaymentForm from "../payment/PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredCategories,
  getUserBookings,
  getOwnerBookings,
  getManagerBookings,
} from "../../store/storeIndex";

const BookingMain = () => {
  const dispatch = useDispatch();

  const [lgShow, setLgShow] = useState(false);

  const token = useSelector((state) => state.user.token);
  const filterableCategories = useSelector(
    (state) => state.category.filterCategories
  );
  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);

  useEffect(() => {
    dispatch(getFilteredCategories("6470b05d2490274856cf6471", token));
  }, [token]);

  const data = [
    {
      icon: Booking,
      description: "205",
      title: "Total Bookings",
      cardColor: "#fff",
    },
    {
      icon: Payment,
      description: "185",
      title: "Paid Bookings",
      cardColor: "#fff",
    },
    {
      icon: Cancel,
      description: "185",
      title: "Cancelled Bookings",
      cardColor: "#fff",
    },
    {
      icon: Total,
      description: "$15,835",
      title: "Total Earning",
      cardColor: "#fff",
    },
  ];

  const filterSpaceHandler = (filterBy) => {
    if (userRole === "Manager") {
      if (filterBy === "all") {
        dispatch(getManagerBookings(userId, token, 1));
      } else {
        dispatch(getManagerBookings(userId, token, 1, filterBy));
      }
    } else if (userRole === "Storage Owner") {
      if (filterBy === "all") {
        dispatch(getOwnerBookings(userId, token, 1));
      } else {
        dispatch(getOwnerBookings(userId, token, 1, filterBy));
      }
    } else {
      if (filterBy === "all") {
        dispatch(getUserBookings(userId, token, 1));
      } else {
        dispatch(getUserBookings(userId, token, 1, filterBy));
      }
    }
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <Col key={index} xs="12" md="6" xl="3">
            <DashboardCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              cardColor={item.cardColor}
            />
          </Col>
        );
      })}

      <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-2">
        <Col xs="12" xl="6" lg="4" md="4" className="">
          <span className="heading"></span>
        </Col>

        <Col
          xs="12"
          xl="6"
          lg="8"
          md="8"
          className="d-flex flex-sm-row gap-sm-0 gap-2 flex-column end start pe-0"
        >
          {/**<div className='d-flex align-items-center w-100 pe-sm-3'>
            <Drops title="Sort by:" options={options} />
    </div>**/}
          <div className="d-flex align-items-center w-100 pe-sm-3">
            {Object.keys(filterableCategories).length > 0 && (
              <div className="d-flex align-items-center justify-content-start w-100">
                <Form.Label className="custom-width mb-0">
                  Select Type:
                </Form.Label>
                <Form.Select
                  aria-label="Default drop-input select example"
                  className="w-75"
                  defaultValue="all"
                  onChange={(e) => filterSpaceHandler(e.target.value)}
                >
                  <option value="all">All</option>
                  {filterableCategories.subcategories.map((cat, index) => {
                    return (
                      <option key={index} value={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            )}
          </div>
          <div className="d-flex align-items-center justify-content-end min-w-max-content ">
            <Button onClick={() => setLgShow(true)}>
              + Add Payment Method
            </Button>
          </div>
        </Col>
      </Row> 
      <div className="pt-2">
        <BookingTable />
      </div>
      <CustomModal1
        heading="Add Payment Method"
        show={lgShow}
        onHide={() => setLgShow(false)}
        // class1="modal1"
      >
        <PaymentForm onHide={() => setLgShow(false)} />
      </CustomModal1>
    </>
  );
};

export default BookingMain;
