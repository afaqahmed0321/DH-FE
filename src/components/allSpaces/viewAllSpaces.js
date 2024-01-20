import React, { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/home.css";
import "../../assets/css/radio.css";
import { Cards } from "../home/Cards";
import { useSelector, useDispatch } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { getUserSpaces } from "../../store/storeIndex";

export default function ViewAllSpaces(props) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);
  const spaces = useSelector((state) => {
    return userRole === "Customer" ? state.space.all : state.space.userSpaces;
  });
  const navigate = useNavigate();

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getUserSpaces(userId, token, page));
  };

  return (
    <Row>
      {Object.keys(spaces).length > 0 && spaces.spaces.length > 0 ? (
        spaces.spaces.map((space, index) => {
          return (
            <Col key={index} xs={12} md={6} lg={6} xxl={4}>
              <Cards
                onClick={() => {
                  if (userRole === "Customer") {
                    navigate(`/dashboard/customer/single-space/${space._id}`);
                  } else {
                    navigate(`/dashboard/single-space/${space._id}`);
                  }
                }}
                class1={props.classes}
                space={space}
              />
            </Col>
          );
        })
      ) : (
        <Alert key="info" variant="info">
          No Spaces to Show Here !
        </Alert>
      )}

      {spaces.totalRecords > 10   ? (
        <PaginationControl
          page={page}
          between={3}
          total={spaces.totalRecords}
          limit={spaces.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={1}
        />
      ) : (
        ""
      )}
    </Row>
  );
}                 
