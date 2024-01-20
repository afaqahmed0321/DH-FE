import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../../shared/TextField";
import "../../assets/css/managerform.css";
import OwnerIcon from "../../assets/images/icons/owner.svg";
import "react-phone-input-2/lib/style.css";
import NameIcon from "../../assets/images/icons/fullName.svg";
import AtIcon from "../../assets/images/icons/@.svg";
import ClockIcon from "../../assets/images/icons/clock.svg";
import PhoneInput from "react-phone-input-2";
import SelectField from "../../shared/SelectField";
import { useSelector, useDispatch } from 'react-redux';
import Toast from "../../shared/Toast";
import { sendManagerInvitation } from "../../store/storeIndex";

// import '../../assets/css/login-form.css';

const ManagerForm = ({ onHide }) => {

  const dispatch = useDispatch();

  const spaces = useSelector((state) => state.space.userSpaces);
  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.user._id);

  const formatedBranches = Object.keys(spaces).length > 0 ? spaces.spaces.map(space => {
    return { value: space._id, option: space.description }
  }) : [];
  const [phone, setPhone] = useState("923013740860");

  const validValues = {
    fullName: "",
    email: "",
    branch: "",
    slotFrom: "",
    slotTo: "",
  };

  const errorSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    branch: Yup.string().required("Branch is required"),
    slotFrom: Yup.string().required("Start time is required"),
    slotTo: Yup.string().required("End time is required"),
  });

  const loginHandler = (values) => {
    if (!phone) {
      return Toast.error("Phone no is required");
    }
    const data = {
      fullName: values.fullName,
      role: 'Manager',
      email: values.email,
      phoneNo: phone,
      branch: values.branch,
      slot: {
        from: values.slotFrom,
        to: values.slotTo
      },
      managerOwner: userId
    };

    dispatch(sendManagerInvitation(data, token, onHide));
  };    

  return (
    <div className="form-space">
      <div>
        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={loginHandler}
        >   
          {({ touched, errors }) => (
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
                    placeholder="Full Name"
                    name="fullName"
                    type="text"
                  />  
                  <TextField
                    margin="mb-4"
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={AtIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />  
                    }
                    placeholder="Email Address"
                    name="email"
                    type="email"
                  />
                  <div className="d-flex flex-column mb-3">
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
                  <div className="mb-4">
                    <SelectField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={OwnerIcon}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Select Branch"
                      name="branch"
                      defaulText="My Spaces"
                      choices={formatedBranches}
                    />
                  </div>
                  <div className='mb-4'>
                    <Row>
                      <Col>
                        <TextField
                          margin="mb-4"
                          icon={
                            <Image
                              fluid
                              className="field-icon"
                              src={ClockIcon}
                              loading="lazy"
                              width={20}
                              height={20}
                            />
                          }
                          placeholder="From"
                          name="slotFrom"
                          type="text"
                          onFocus={(e) => (e.target.type = "time")}
                        />
                      </Col>
                      <Col>
                        <TextField
                          margin="mb-4"
                          icon={
                            <Image
                              fluid
                              className="field-icon"
                              src={ClockIcon}
                              loading="lazy"
                              width={20}
                              height={20}
                            />
                          }
                          placeholder="To"
                          name="slotTo"
                          type="text"
                          onFocus={(e) => (e.target.type = "time")}
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-end mt-3 mb-2 gap-sm-0 gap-3">
                <Col md="6" sm="4">
                  <Button
                    onClick={onHide}
                    className="px-2 py-2 rounded btn-blue-outline text-primary bg-lightBlue w-100"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md="6" sm="4">
                  <Button
                    type="submit"
                    className="px-2 py-2 rounded btn-blue w-100"
                  >
                    Send Invite
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

export default ManagerForm;
