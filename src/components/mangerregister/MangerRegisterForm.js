import React from "react";
import { Button, Image } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import LogoImg from "../../assets/images/logo.png";
import TextField from "../../shared/TextField";
import RateIcon from "../../assets/images/icons/@.png";
import PassIcon from "../../assets/images/icons/lock.png";
import "../../assets/css/login-form.css";

import { signupManager } from "../../store/storeIndex";

const MangerRegisterForm = () => {

  let [searchParams] = useSearchParams();

  const userEmail = searchParams.get('email');
  const userBranch = searchParams.get('branch');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validValues = {
    email: userEmail,
    password: "",
    cPassword: "",
  };

  const errorSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .required("Password is required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password")], 'Must match "password" field value')
      .required("Confirm password is required"),
  });

  const loginHandler = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      role: "Manager",
      passwordConfirm: values.cPassword,
      spaceId: userBranch
    };

    dispatch(signupManager(data, navigate, "/auth/personal-information", data.role));
  };

  return (
    <div className="form-space px-sm-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" />

      <h2 className="auth-heading">
        Register <span className="auth-special">Now</span>
      </h2>
      <p className="auth-subheading mb-5">Create your new account.</p>

      <div className="mt-3">
        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={loginHandler}
        >
          {(formik) => (
            <Form>
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
              />
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
                placeholder="Password"
                name="password"
                type="password"
              />
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
                placeholder="Confirm Password"
                name="cPassword"
                type="password"
              />
              <Button type="submit" className="w-100 mt-3 h-56px">
                Next
              </Button>
            </Form>
          )}
        </Formik>
        <p className="auth-subheading fw-bold text-center mt-5 text-dark">
          Already have an account?
          <Link to="/auth/customer/login" className="text-decoration-none ps-1">
            <span className="forget fs-6">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MangerRegisterForm;
