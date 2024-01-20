import React, { lazy, useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { Container } from "react-bootstrap";
import CustomerHomeHeader from "../../components/customer/HomeHeader";
import "../../assets/css/customers.css";
import ErrorBoundary from "../../shared/ErrorBoundary";
import ErrorBoundaryAlert from '../../shared/ErrorBoundaryAlert';
import { useDispatch, useSelector } from "react-redux";
import { getAllSpaces } from "../../store/storeIndex";

const ViewAllSpaces = lazy(() =>
  import("../../components/allSpaces/viewAllSpaces")
);
const MapView = lazy(() => import("../../components/customer/MapView"));

const CustomerHome = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(getAllSpaces(token));
  }, [token]);

  const [view, setView] = useState("Grid");
  return (
    <div>
      <MainLayout>
        <Container fluid>
          <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
            <CustomerHomeHeader setView={setView} view={view} />
            {view === "Grid" ? <ViewAllSpaces classes="check-customer" /> : <MapView />}
          </ErrorBoundary>
        </Container>
      </MainLayout>
    </div>
  );
};

export default CustomerHome;
