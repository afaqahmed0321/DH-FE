import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../../assets/css/dashboard-misc.css";
import CustomModal1 from "../../shared/CustomModal1";
import ManagerForm from "./ManagerForm";
import ManagerTable from "./ManagerTable";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredCategories, getOwnerManagers, getUserSpaces } from '../../store/storeIndex';

const ManagerMain = () => {
  const dispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);

  const token = useSelector(state => state.user.token);
  const filterableCategories = useSelector(state => state.category.filterCategories);
  const userId = useSelector(state => state.user.user._id);

  useEffect(() => {
    dispatch(getFilteredCategories('6470b05d2490274856cf6471', token));
  }, [token]);

  useEffect(() => {
    dispatch(getUserSpaces(userId, token));
  }, [userId, token]);

  const filterSpaceHandler = (filterBy) => {
    if (filterBy === 'all') {
      dispatch(getOwnerManagers(userId, token, 1));
    }
    else {
      dispatch(getOwnerManagers(userId, token, 1, filterBy));
    }
  };

  return (
    <>
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0  gap-xl-0 gap-2">
        <Col sm="5" xxl="5" xl="3" className="">
          <span className="heading">My Managers</span>
        </Col>
        <Col sm="5" className="d-md-none d-sm-block d-none p-0">
          <div className="d-flex align-items-center justify-content-end min-w-max-content">
            <Button>+ Add Payment Method</Button>
          </div>
        </Col>
        <Col
          xs="12"
          xxl="7"
          xl="9"
          className="d-flex flex-md-row flex-column-reverse justify-content-between gap-2 pe-0"
        >
          <div className="d-flex align-items-center justify-content-between flex-sm-row gap-2 flex-column w-100">
            {/**<div className="d-flex align-items-center w-100 pe-md-3">
              <Drops title="Sort by:" options={options} />
  </div>**/}
            <div className="d-flex align-items-center w-100 pe-md-3">
              {Object.keys(filterableCategories).length > 0 && <div className='d-flex align-items-center justify-content-end w-100'>
                <Form.Label className='mb-0'>Select Type: &nbsp;</Form.Label>
                <Form.Select aria-label="Default drop-input select example" className='w-50' defaultValue="all" onChange={e => filterSpaceHandler(e.target.value)}>
                  <option value="all">All</option>
                  {filterableCategories.subcategories.map((cat, index) => {
                    return <option key={index} value={cat._id}>{cat.name}</option>
                  })}
                </Form.Select>
              </div>}
            </div>
          </div>
          <div className="d-md-flex d-sm-none d-flex align-items-center min-w-max-content">
            <Button onClick={() => setLgShow(true)}>+ Add New Manager</Button>
          </div>
        </Col>
      </Row>
      <div className="pt-2">
        <ManagerTable />
      </div>

      <CustomModal1
        heading="Add New Manager"
        show={lgShow}
        onHide={() => setLgShow(false)}
      >
        <ManagerForm onHide={() => setLgShow(false)} />
      </CustomModal1>
    </>
  );
};

export default ManagerMain;
