import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CustomModal1 from "../shared/CustomModal1";
import TruckForm from "../components/Trucks/TruckForm";
import TruckCardSpaces from "../components/Trucks/TruckCardSpaces";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "../store/storeIndex";

const Trucks = () => {

  const dispatch = useDispatch();

  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.user._id);

  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    dispatch(getAllVehicles(userId, token));
  }, [userId, token]);

  return (
    <div>
      <MainLayout>
        <Row className="mt-3 d-flex justify-content-between align-items-centernn w-100 pe-0">
          <Col xs="12" lg="6" className="">
            <span className="heading">My Vehicles</span>
          </Col>

          <Col xs="12" lg="2" className="d-flex end start pe-0">
            <div className="d-flex align-items-center w-100">
              <Button
                className="btn-blue w-50 w-sm-100 w-md-100 py-3"
                onClick={() => setLgShow(true)}
              >
                + Add New Vehicle
              </Button>
            </div>
          </Col>
          <TruckCardSpaces />
        </Row>
      </MainLayout>
      <CustomModal1
        heading="Add New Vehicle"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="new-space-modal new-space-modal"
      >
        <TruckForm onHide={() => setLgShow(false)} />
      </CustomModal1>
    </div>
  );
};

export default Trucks;
