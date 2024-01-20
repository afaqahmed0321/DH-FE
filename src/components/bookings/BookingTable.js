/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserBookings,
  getOwnerBookings,
  getManagerBookings,
} from "../../store/storeIndex";
import { PaginationControl } from "react-bootstrap-pagination-control";
import threeDots from "../../assets/images/icons/CardIcons/threeDots.svg";
import "../../assets/css/table.css";

function BookingTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const name = useSelector((state) => state.booking);
  const bookings = useSelector((state) => state.booking.bookings);
  const userRole = useSelector((state) => state.user.user.role);

  const pageHandler = (page) => {
    setPage(page);
    if (userRole === "Manager") {
      dispatch(getManagerBookings(userId, token, page));
    } else if (userRole === "Storage Owner") {
      dispatch(getOwnerBookings(userId, token, page));
    } else {
      dispatch(getUserBookings(userId, token, page));
    }
  };

  return (
    <div className="bg-white rounded custom-table">
      {Object.keys(bookings).length > 0 && bookings.bookings.length > 0 ? <Table responsive hover className="mt-2" striped>
        <thead>
          <tr>
            <th>Customer Full Name</th>
            <th>Branch Location</th>
            <th>Contact Info</th>
            <th>From</th>
            <th>To</th>
            <th>Space Type</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(bookings).length > 0 && bookings.bookings.length > 0
            && bookings.bookings.map((item, index) => {
              const fromDate = new Date(item.from);
              const toDate = new Date(item.to);

              const options = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                month: "long",
                day: "numeric",
                year: "numeric",
              };
              const formattedFromDate = fromDate.toLocaleString(
                "en-US",
                options
              );
              const formattedToDate = toDate.toLocaleString("en-US", options);
              return (
                <tr key={index} className="pt-3">
                  <td>
                    <div className="d-flex align-items-center w-25 h-25">
                      <Image
                        src={`${process.env.REACT_APP_SERVER_URL}${item.userId.photo}`}
                        className="table-pic-size rounded-1"
                      />
                      <p className="ps-3 p-0 m-0 tb-data">
                        {item.userId.fullName}
                      </p>
                    </div>
                  </td>
                  <td>{item.spaceId.address}</td>
                  <td>{item.spaceId.contact}</td>
                  <td>{formattedFromDate}</td>
                  <td>{formattedToDate}</td>
                  <td>{item.details.type}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.spaceId.available ? (
                      <Button
                        className="custom-status bg-lightgreen paid rounded fw-bold "
                        variant="outline-success"
                      >
                        {`Paid`}
                      </Button>
                    ) : (
                      <Button
                        className="custom-status bg-lightRed unpaid rounded fw-bold"
                        variant="outline-danger"
                      >
                        <Image src={item.threeDots} />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table> : (
        <Alert key="info" variant="info" className="m-0">
          You have not added any bookings yet
        </Alert>
      )}
      {bookings.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={bookings.totalRecords}
          limit={bookings.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={2}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default BookingTable;
