import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Col, Image, Row } from "react-bootstrap";
import TextField from "../../shared/TextField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DobIcon from "../../assets/images/icons/dob.svg";
import RateIcon from '../../assets/images/icons/@.png';
import { useSelector, useDispatch } from "react-redux";
import { updateUserAccount } from "../../store/storeIndex";
import "../../assets/css/account-settings.css"


export const newPasswordValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Name is Required"),
  email: Yup.string().required("Email is Required"),
  mydate: Yup.string().required("Date is Required"),
  bio: Yup.string().required("Bio is Required"),
});

const AccountNewPassword = () => {

  const dispatch = useDispatch();

  const token = useSelector(state => state.user.token);
  const userDetails = useSelector(state => state.user.user);

  const [phone, setPhone] = useState(userDetails.phoneNo);

  const initialValues = {
    userName: userDetails.fullName,
    email: userDetails.email,
    mydate: userDetails.dob,
    bio: userDetails.bio,
  };

  const submitHandler = (values) => {
    const data = {
      fullName: values.userName,
      dob: values.mydate,
      bio: values.bio,
      email: values.email,
      phoneNo: phone
    };
    dispatch(updateUserAccount(data, token));
  };

  return (
    <div>
      <h3 className="font-24 font-sm-18 font-weight-800 mb-3">About</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={newPasswordValidationSchema}
        onSubmit={submitHandler}
      >
        {({ touched, errors }) => (
          <Form action="" className="text-light-black">
            <Row className="align-items-start pb-sm-0 gap-sm-0 gap-2 about-sm">
              <Col sm="6" className="">
                <div className="d-flex flex-column full-name">
                  <Field
                  
                    type="text"
                    className={`input-style
                    ${touched.userName && errors.userName ? "is-invalid" : ""}`}
                    id="userName"
                    placeholder="Full Name"
                    name="userName"
                    minLength={8}
                    maxLength={12}
                  />
                  <ErrorMessage
                    component="div"
                    name="userName"
                    className="invalid-feedback fw-bold mt-2"
                  />
                </div>
              </Col>
              <Col sm="6" className="m-0 p-0">
              <div className="d-flex flex-column full-name custom-w">
                <TextField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={RateIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  placeholder="Email"
                  name="email"
                  type="email"
                  readOnly
                  className="mb-0 w-100 border-0 "
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback fw-bold mt-2"
                />
                </div>
              </Col>
            </Row>
            <Row className="align-items-start pb-sm-0 gap-sm-0 gap-2">
              <Col sm="6">
                <div className="d-flex flex-column">
                  <div className="input-style">
                    <PhoneInput
                      enableAreaCodes={true}
                      placeholder="Mobile"
                      onChange={(phone) => setPhone(phone)}
                      value={phone}
                      className="h-100 w-100 rounded-3"
                      inputClass={`form-control border-0 rounded-3 h-100 w-100 font-18 font-weight-400 ${touched && !phone ? "is-invalid" : ""
                        }`}
                      buttonClass="border-0 bg-transparent rounded-3"
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                    />
                  </div>
                  {touched && errors && !phone && (
                    <p className="invalid-feedback d-block mt-2 fw-bold">
                      Phone is required
                    </p>
                  )}
                </div>
              </Col>
              <Col sm="6"  className="m-0 p-0">
              <div className="d-flex flex-column full-name custom-w">
                <TextField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={DobIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  // value=""
                  placeholder="Date of Birth"
                  name="mydate"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                />
                </div>
              </Col>
            </Row>
            <div className="d-flex flex-column pb-4">
              <Field
                className={`form-control input-textarea-style h-fit-content w-100 p-3 text-area
                    ${touched.bio && errors.bio ? "is-invalid" : ""}`}
                as="textarea"
                rows="5"
                name="bio"
                placeholder="Add Your Bio"
              />
              <ErrorMessage
                component="div"
                name="bio"
                className="invalid-feedback"
              />
            </div>

            {/**<Row className="align-items-start pb-4 gap-sm-0 gap-2">
              <Col sm="6">
                <SelectField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={RoleIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  placeholder="Select Language"
                  name="language"
                  defaulText="Select Language"
                  choices={roleValues}
                />
              </Col>
                </Row>**/}

            <Row className="justify-content-end mt-5 gap-sm-0 gap-2">
              <Col md="3" sm="4" className="">
                <Button type="submit" className="btn-blue-outline w-100  ">
                  Cancel
                </Button>
              </Col>
              <Col md="3" sm="4" className=" ">
                <Button type="submit" className="btn-blue w-100 ">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountNewPassword;
