import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../../shared/TextField";
import { useSelector, useDispatch } from "react-redux";

import ExpiryIcon from "../../assets/images/icons/expiry.svg";
import NameIcon from "../../assets/images/icons/fullName.svg";
import LicIcon from "../../assets/images/icons/license.png";
import { addUserCard } from "../../store/storeIndex";


const PaymentForm = ({ onHide }) => {

  const dispatch = useDispatch();

  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.user._id);

  const validValues = {
    fullName: "",
    cardNo: "",
    expiry: "",
    cvc: "",
  };

  const errorSchema = Yup.object().shape({
    cardNo: Yup.string().matches(/^\d+$/, 'Card must contain digits only').required("Card no is required"),
    fullName: Yup.string().required("Name is required"),
    expiry: Yup.string().required("Expiry is required"),
    cvc: Yup.string().matches(/^\d+$/, 'CVC must contain digits only').max(3, 'CVC must be 3 digits').required("CVC is required"),
  });

  const loginHandler = (values) => {
    const expMonth = +values.expiry.split('-')[1];
    const expYear = +values.expiry.split('-')[0];
    const data = {
      userId,
      cardNo: values.cardNo,
      expMonth,
      expYear,
      cvc: values.cvc,
      name: values.fullName
    };

    dispatch(addUserCard(data, token, onHide));
  };

  return (
    <div className="form-space">
      <div>
        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={loginHandler}
        >
          {(formik) => (
            <Form>
              <Row>
                <Col className="p-0">
                  <TextField
                    margin="mb-4"
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={NameIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Name on Card"
                    name="fullName"
                    type="text"
                  />
                  <TextField
                    margin="mb-4"
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={LicIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Card Number"
                    name="cardNo"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="ps-0">
                  <TextField
                    margin="mb-4"
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={ExpiryIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Expiry Date"
                    name="expiry"
                    type="text"
                    onFocus={(e) => (e.target.type = "month")}
                  />
                </Col>
                <Col className="pe-0">
                  <TextField
                    margin="mb-4"
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={LicIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="CVC"
                    name="cvc"
                    type="text"
                  />
                </Col>
              </Row>
              <Row className="justify-content-end mt-3 mb-2 gap-sm-0 gap-3">
                <Col md="6" sm="4">
                  <Button onClick={onHide} className="px-2 py-2 rounded btn-blue-outline text-primary bg-lightBlue w-100">
                    Cancel
                  </Button>
                </Col>
                <Col md="6" sm="4">
                  <Button type="submit" className="px-2 py-2 rounded btn-blue w-100">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentForm;
