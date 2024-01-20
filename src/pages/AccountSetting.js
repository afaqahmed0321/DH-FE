import React from "react";
import AccountSettingSidebar from "../components/account setting/AccountSettingSidebar";
import MainLayout from "../layout/MainLayout";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../assets/css/account-settings.css";

const AccountSetting = ({ children }) => {
  return (
    <div className="account-setting">
      <MainLayout>
        <Container fluid>
          <h3 className="font-24 font-weight-800 mb-3">Account Settings</h3>
          <Row className="gap-lg-0 gap-3">
            <Col xxl="3" lg="4">
              <AccountSettingSidebar />
            </Col>
            <Col xxl="9" lg="8">
              <Card className="account-setting-card shadow1">{children}</Card>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </div>
  );
};

export default AccountSetting;
