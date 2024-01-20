import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import CustomModal from "../../shared/CustomModal";
import SpaceForm from "./SpaceForm";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredCategories, getUserSpaces } from "../../store/storeIndex";
import "../../assets/css/responsive.css";
import "../../assets/css/radio.css"

export default function Header() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const token = useSelector((state) => state.user.token);
  const filterableCategories = useSelector(
    (state) => state.category.filterCategories
  );
  const userId = useSelector((state) => state.user.user._id);

  const [category, setCategory] = useState(
    categories !== undefined && Object.keys(categories).length > 0
      ? categories?.subcategories[0]?._id
      : ""
  );

  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    dispatch(getFilteredCategories("6470b05d2490274856cf6471", token));
  }, [token]);

  const filterSpaceHandler = (filterBy) => {
    if (filterBy === "all") {
      dispatch(getUserSpaces(userId, token, 1));
    } else {
      dispatch(getUserSpaces(userId, token, 1, filterBy));
    }
  };

  return (
    <div className="main my-3">
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-2">
        <Col sm="5" md="4" lg="4" xl="7" className="">
          <span className="heading">My Spaces</span>
        </Col>
        <Col
          xs="12"
          md="8"
          lg="8"
          xl="5"
          className="d-flex flex-sm-row flex-column-reverse justify-content-between gap-2 pe-0"
        >
          <div className="d-flex align-items-center w-100 pe-md-3">
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
          <div className="d-flex align-items-center min-w-max-content">
            <Button
              className="space-btn-font space-btn-size custom-button-font"
              onClick={() => setLgShow(true)}
            >
              + Add new Space
            </Button>
          </div>
        </Col>
      </Row>

      <CustomModal
        heading="Add New Space"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="new-space-modal new-space-modal"
      >
        <h4 className="text-18 text-black fw-bold">Select Space Type</h4>
        <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
          {categories !== undefined &&
            Object.keys(categories).length > 0 &&
            categories?.subcategories.map((cat, index) => {
              return (
                <div key={index}>
                  <Form.Check
                    onChange={() => {
                      setCategory(cat._id);
                    }}
                    inline
                    label={cat.name}
                    name={`group-${index}`}
                    className="m-0 p-0 centered-tabs"
                    type="radio"
                    checked={cat._id === category}
                    id={`inline-radio-${index}`}
                  />
                </div>
              );
            })}
        </div>
        <SpaceForm category={category} onHide={() => setLgShow(false)} />
      </CustomModal>
    </div>
  );
}
