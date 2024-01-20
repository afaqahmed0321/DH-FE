import React, { useState, useCallback, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


import LogoImg from "../../assets/images/logo.png";
import TextField from "../../shared/TextField";
import NameIcon from "../../assets/images/icons/full-name.png";
import DobIcon from "../../assets/images/icons/dob.png";
import "../../assets/css/login-form.css";
import { updateUserProfile } from "../../store/storeIndex";
import UploadImg from "../../assets/images/icons/CardIcons/camera.svg";
import Toast from "../../shared/Toast";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const token = useSelector((state) => state.user.token);

  const [phno, setPhno] = useState("920123456789");
  const [docFiles, setDocFiles] = useState('');
  const [preview, setPreview] = useState('');

  const validValues = {
    fullName: "",
    dob: "",
    bio: "",
  };

  const errorSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    dob: Yup.string().required("DOB is required"),
    bio: Yup.string().required("Bio is required"),
  });

  const loginHandler = (values) => {
    if (!docFiles) {
      return Toast.error("Profile picture required");
    }
    if (!phno) {
      return Toast.error("Phone no is required");
    }

    const data = new FormData();
    data.append("profile_img", docFiles);
    data.append("phoneNo", phno);
    data.append("fullName", values.fullName);
    data.append("dob", values.dob);
    data.append("bio", values.bio);
    data.append("field", 'Personal');
    dispatch(updateUserProfile(data, navigate, token, state.role));
  };

  const onDrop = useCallback((acceptedFiles) => {
    setDocFiles(acceptedFiles[0]);
  }, []);

  const accept = {
    "image/png": [".png"],
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
  };

  const { getRootProps, getInputProps } = useDropzone({ accept, onDrop });

  useEffect(() => {
    if (docFiles) {
      var objectUrl = URL.createObjectURL(docFiles);
      setPreview(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [docFiles]);

  return (
    <div className="form-space px-sm-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" />

      <h2 className="auth-heading">
        Personal <span className="auth-special">Info</span>
      </h2>
      <p className="auth-subheading">Enter your personal information below.</p>

      <div className="mt-5">
        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={loginHandler}
        >
          {(formik, touched, errors) => (
            <Form>
              {
                preview ? <Image fluid src={preview} loading='lazy' className='user-img mb-3' width={150} /> :
                  <div
                    className="field-container dotted w-max-content px-3 py-4 mb-3"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="d-flex flex-column align-items-center justify-content-center gap-2 py-3 ">
                      <Image fluid src={UploadImg} loading="lazy" />
                      <p className="grey p-0 m-0">Upload Picture</p>
                    </div>
                  </div>
              }

              <TextField
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

              <div className="d-flex flex-column">
                <div className="field-container h-56px">
                  <PhoneInput
                    enableAreaCodes={true}
                    placeholder="Mobile"
                    onChange={(phno) => setPhno(phno)}
                    value={phno}
                    className="h-100 w-100 rounded-3"
                    inputClass={`form-control border-0 rounded-3 h-100 w-100 font-18 font-weight-400 ${touched && !phno ? "is-invalid" : ""
                      }`}
                    buttonClass="border-0 bg-transparent rounded-3"
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                  />
                </div>
                {touched && errors && !phno && (
                  <p className="invalid-feedback d-block mt-2 fw-bold">
                    Phone is required
                  </p>
                )}
              </div>
              {formik.touched && !phno && (
                <p className="text-danger fw-bold">Phone is required</p>
              )}
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
                placeholder="Date of Birth"
                name="dob"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
              />
              <div className="mb-3">
                <Field
                  as="textarea"
                  rows="5"
                  className={`form-control shadow-none  ${formik.touched && formik.error && "is-invalid"
                    }`}
                  name="bio"
                  placeholder="Add Your Bio"
                />
                <ErrorMessage
                  component="small"
                  name="bio"
                  className="text-danger fw-bold"
                />
              </div>
              <Button type="submit" className="w-100 mt-3 h-56px">
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <p className="auth-subheading fw-bold text-center mt-5 text-dark">
          By registering, you’re agree to our,
          <span className="forget">Terms & Condition</span> and
          <span className="forget">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
