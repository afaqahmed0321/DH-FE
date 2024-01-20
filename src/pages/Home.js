import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import MainLayout from "../layout/MainLayout";
import HomeHeader from "../components/home/HomeHeader";
import Spaces from "../components/home/Spaces";
import BookingHeader from "../components/home/BookingHeader";
import BookingTable from "../components/home/BookingTable";
import EventCalender from "../components/home/Calender";
import PurchaseSale from "../components/home/PurchaseSale";

const Home = () => {
  return (
    <MainLayout>
      <Container fluid>
        <HomeHeader heading="My Spaces" />
        <Spaces />
        <BookingHeader />
        <BookingTable />
        <Row className="mt-4 pt-3">
          <Col xl={7} className="mb-4">
            <PurchaseSale />
          </Col>
          <Col xl={5} className="mb-4">
            <EventCalender />
          </Col>
        </Row>
      </Container>                 
    </MainLayout>
  );
};

export default Home;
