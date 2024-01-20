import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ViewAllSpaces from "../components/allSpaces/viewAllSpaces";
import MainLayout from "../layout/MainLayout";
import Header from "../components/allSpaces/header";
import { getUserSpaces } from "../store/storeIndex";

const AllSpaces = () => {

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  useEffect(() => {
    dispatch(getUserSpaces(userId, token));
  }, [userId, token]);

  return (
    <MainLayout>
      <Container fluid>
        <Header />
        <ViewAllSpaces />
      </Container>
    </MainLayout>
  );
};
export default AllSpaces;
