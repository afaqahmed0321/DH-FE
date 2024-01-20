import { useEffect } from "react";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthSlider from "../hoc/AuthSlider";

const AuthLayout = ({ children }) => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100vh";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md="12" lg="4">
            {children}
          </Col>
          <Col md="12" lg="8">
            <AuthSlider />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { AuthLayout };
