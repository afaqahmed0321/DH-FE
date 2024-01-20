import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Col, Image, Row } from "react-bootstrap";
import TextField from "../../shared/TextField";
import PassIcon from '../../assets/images/icons/lock.png';
import EyeIcon from '../../assets/images/icons/eye.svg';
import CloseEye from '../../assets/images/icons/closeeye.png';

import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../store/storeIndex";

export const newPasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Password is Required"),
  newPassword: Yup.string()
    .min(8, "Password minimum length should be 8")
    .required("Password is Required"),
  confirmPassword: Yup.string().when("newPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Both password need to be the same")
      .required("Password is Required"),
  }),
});

const ChangeAccountPassword = () => {

  const dispatch = useDispatch();

  const token = useSelector(state => state.user.token);

  const submitHandler = (values) => {
    const data = {
      passwordCurrent: values.oldPassword,
      password: values.newPassword,
      passwordConfirm: values.confirmPassword
    };
    dispatch(updateUserPassword(data, token));
  };

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  return (
    <div>
      <h3 className="font-24 font-weight-800 mb-3">Change Password</h3>
      <p className="mb-4 pb-3 text-grey font-14 font-weight-400">
        Create your new password.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={newPasswordValidationSchema}
        onSubmit={submitHandler}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form action="" className="text-light-black">
            <Row className="align-items-start pb-2 gap-sm-0">
              <Col sm="12" className="mb-sm-2 p-0 m-0">
              <div className="d-flex flex-column full-name custom-w">
                <TextField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={PassIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye ? CloseEye: EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => { setEye(!eye) }}
                    />
                  }
                  placeholder="Old Password"
                  name="oldPassword"
                  type={eye ? "text" : "password"}
                />
                <ErrorMessage
                  component="div"
                  name="oldPassword"
                  className="invalid-feedback"
                />
                </div>
              </Col>

              <Col sm="6" className="ps-0">
                <TextField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={PassIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye1 ? CloseEye: EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => { setEye1(!eye1) }}
                    />
                  }
                  placeholder="New Password"
                  name="newPassword"
                  type={eye1 ? "text" : "password"}
                />
                <ErrorMessage
                  component="div"
                  name="newPassword"
                  className="invalid-feedback"
                />
              </Col>
              <Col sm="6" className="p-0 m-0">
              <div className="d-flex flex-column full-name custom-w">
                <TextField 
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={PassIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye2 ? CloseEye: EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => { setEye2(!eye2) }}
                    />
                  }
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  type={eye2 ? "text" : "password"}
                />
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                  className="invalid-feedback"
                />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-end mt-4 gap-sm-0 gap-3">
              <Col md="3" sm="4">
                <Button type="submit" className="btn-blue-outline w-100">
                  Cancel
                </Button>
              </Col>
              <Col md="3" sm="4">
                <Button type="submit" className="btn-blue w-100">
                  Save Change
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeAccountPassword;
