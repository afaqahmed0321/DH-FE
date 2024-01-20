import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button, Dropdown, Image, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getOwnerManagers } from "../../store/storeIndex";
import { PaginationControl } from "react-bootstrap-pagination-control";
import threeDots from "../../assets/images/icons/threeDots.svg";
// import {deleteManager} from '../../store/storeIndex'
import '../../assets/css/loading.css';
import Loader from '../../assets/images/icons/Loader/Background.svg'

function ManagerTable(props) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteManagerId, setDeleteManagerId] = useState("");

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const managers = useSelector((state) => state.user.managers);
  // const managersId = useSelector((state) => state.user.managers.managers[0]._id);
  // console.log(managersId);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const deleteSpaceHandler = (id) => {
    setDeleteManagerId(id);                                                                                                                       
    handleShow();
  };                                                                                                                                              
  const confirmDeleteHandler = () => {
    // dispatch(deleteManager(userId, deleteManagerId, token, managersId,handleClose));
  };

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getOwnerManagers(userId, token, page));
  };

  useEffect(() => {
    dispatch(getOwnerManagers(userId, token));
  }, [token, userId, dispatch]);

  return (
    <div className="bg-white rounded custom-table">
      {Object.keys(managers).length > 0 && managers.managers.length ? (
        <Table responsive hover className="mt-2" striped>
          <thead>
            <tr>
              <th>Manager Full Name</th>
              <th>Branch Location</th>
              <th>Shift Time Slot</th>
              <th>Contact Info</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(managers).length > 0 &&                                                                    
              managers.managers.length > 0 &&
              managers.managers.map((item, index) => (                                                                        
                <tr key={index} className="pt-3">                                                          
                  <td>
                    <div className="d-flex align-items-center w-25 h-25">
                      <Image
                        src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`}
                        className="table-pic-size"
                      />
                      <p className="p-0 ms-2">{item.fullName}</p>
                    </div>
                  </td>
                  {/* <td>{item.branch.description}</td> */}
                  <td>{`${item.slot.from} to ${item.slot.to}`}</td>
                  <td>{item.phoneNo}</td>

                  <td>
                    {item.isTrue ? (
                      <Button
                        className="custom-status bg-lightgreen paid rounded fw-bold "
                        variant="outline-success"
                      >
                        {`Active`}
                      </Button>
                    ) : (
                      <Button
                        className="custom-status bg-secondary1 unpaid rounded fw-bold"
                        variant="outline-secondary"
                      >
                        {`Unavailable`}
                      </Button>
                    )}     
                  </td>
                  <td className=" >!py-5 text-end">
                    <div className="threeDots-dropdown">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <Image
                            alt="gallery"
                            src={threeDots}
                            className=" pe-2"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => deleteSpaceHandler(props.id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        className="delete-modal"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <div className="fw-bold">Delete Space</div>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="fs-4">
                            Are you sure you want to delete the space?
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary"
                           onClick={handleClose}
                           >
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={confirmDeleteHandler}
                          >
                            Confirm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <Alert key="info" variant="info" className="m-0">
          You have not added any managers yet
        </Alert>
      )}
      {managers.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={managers.totalRecords}
          limit={managers.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={2}
        />
      ) : (
        ""
      )}                                                                                                                                           
    </div>
  );
}

export default ManagerTable;
