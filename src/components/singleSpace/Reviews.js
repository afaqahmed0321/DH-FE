import React from 'react'
import { Row } from 'react-bootstrap'
import ReviewContent from './ReviewContent'

const Reviews = (props) => {
    return (
        <Row className='bg-white py-3 px- radius-10 mt-4'>
            <div className="main my-3 ">
                <div className="content-head d-flex px-3 justify-content-between align-items-center">
                    <div className={`heading text-24 ${props.class}`}>Customers Reviews  <span className="text-primary fst-italic">{props.highlight}</span></div>
                </div>
            </div>
            <p className='ms-4'>No Reviews Yet</p>

            {/* <hr/>

            <ReviewContent/>
            <hr/>
            <ReviewContent/>
            <hr/>
            <ReviewContent/> */}

        </Row>
    )
}

export default Reviews
