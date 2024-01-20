import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";

import MainHeader from "../components/singleSpaceCustomer/MainHeader";
import { MainCardCompnent } from "../components/singleSpaceCustomer/Main";
import electric1 from "../assets/images/icons/CardIcons/electric1.svg";
import electric2 from "../assets/images/icons/CardIcons/electric2.svg";
import electric3 from "../assets/images/icons/CardIcons/electric3.svg";
import electric4 from "../assets/images/icons/CardIcons/electric4.svg";
import Reviews from "../components/singleSpace/Reviews";
import { getSingleSpace } from "../store/storeIndex";
const SingleSpaceCustomer = () => {
  const dispatch = useDispatch();

  const { sid } = useParams();

  const token = useSelector((state) => state.user.token);
  const singleSpace = useSelector((state) => state.space.singleSpace);

  useEffect(() => {
    dispatch(getSingleSpace(sid, token));
  }, [sid, token]);

  return (
    <MainLayout>
      <Container fluid>
        <MainHeader
          heading="My Spaces / "
          highlight={singleSpace?.description || ""}
          class="fst-italic font-grey "
        />
        <MainCardCompnent
          icon1={electric1}
          icon2={electric2}
          icon3={electric3}
          icon4={electric4}
        />  
        <Reviews />
      </Container>
    </MainLayout>
  );
};

export default SingleSpaceCustomer;
