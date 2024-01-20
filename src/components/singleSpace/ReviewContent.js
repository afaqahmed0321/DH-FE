import React from "react";
import Profile from "../../assets/images/icons/table.svg";
import Rating from "../../assets/images/icons/CardIcons/rating.svg";
import "../../assets/css/reviews.css";

import { Image } from "react-bootstrap";

const ReviewContent = (props) => {
  return (
    <div>
      <div className="main my-3">
        <div className="content-head image-custom-padding d-flex justify-content-between align-items-center">
          <div>
            <div className='d-flex align-items-center'>
              <Image src={Profile} />
              <div className='d-flex flex-column ps-3'>
                <p className='p-0 m-0 custom-heading-font fw-bold'>Tony Stark</p>
                <div>            
                  <span className='pe-2 text-grey text-16'>4.0</span>
                  <Image src={Rating} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-black text-20 d-flex align-items-center">
            <label className="text-16 text-grey">12-05.2023</label>
          </div>
        </div>
      </div>

      <div className="custom-padding">
        <p className="text-16 line-20">
          Lorem ipsum dolor sit amet consectetur. Et in cursus egestas ipsum
          scelerisque cursus a vestibulum. Fringilla non semper purus vestibulum
          tortor faucibus. Pretium varius elit quis et. Eleifend scelerisque
          orci purus sit. Suspendisse elit pulvinar sem malesuada fermentum mi
          molestie. Pharetra fringilla nunc suspendisse massa etiam integer
          tempor blandit. Faucibus sit habitant est netus risus ullamcorper
          pellentesque. Quam et magna imperdiet mauris congue orci non
          phasellus. Vestibulum amet pharetra eget viverra.
        </p>
      </div>
    </div>
  );
};

export default ReviewContent;