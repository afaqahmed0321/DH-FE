import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LogoImg from "../../../assets/images/logo.png";
import TextField from "../../../shared/TextField";
import RateIcon from "../../../assets/images/icons/@.png";
import PassIcon from "../../../assets/images/icons/lock.png";
import EyeIcon from "../../../assets/images/icons/eye.svg";
import CloseEye from '../../../assets/images/icons/closeeye.png';

// import "../../../assets/css/login-form.css";
import { signupUser } from "../../../store/storeIndex";
import RegisterRadios from "../../register/registerRadios";
import TruckDriver from "../../../assets/images/icons/truckDriver.js";
import ServiceProvider from "../../../assets/images/icons/serviceProvider.js";
import StorageOwner from "../../../assets/images/icons/storageOwner.js";
import Toast from "../../../shared/Toast";


const ProviderRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("Truck Driver");

  const validValues = {
    email: "",
    password: "",
    cPassword: ""
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
    if (!category) {
      return Toast.error('Account type is required');
    }
    const data = {
      email: values.email,
      password: values.password,
      passwordConfirm: values.cPassword,
      role: category,
    };

    const moveTo = "/auth/personal-information";
    const role = category === 'Truck Driver' ? 'Truck Driver' : 'Business';
    dispatch(signupUser(data, navigate, moveTo, role));
  };

  const radio = [
    {
      id: "1",
      imgSrc: <TruckDriver />,
      text: "Truck Driver",
    },
    {
      id: "2",
      imgSrc: <ServiceProvider />,
      text: "Service Provider",
    },
    {
      id: "3",
      imgSrc: <StorageOwner />,
      text: "Storage Owner",
    },
  ];
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  return (
    <div className="form-space service-provide-register px-sm-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" />
      <h2 className="auth-heading">
        Register <span className="auth-special">Now</span>
      </h2>
      <p className="auth-subheading">Create your new account.</p>

      <div className="">
        <div className="mb-3 d-flex gap-3">
          {radio.map((data, index) => {
            return (
              <RegisterRadios
                key={index}
                data={data}
                category={category}
                setCategory={setCategory}
              />
            );
          })}
        </div>

        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={loginHandler}
        >
          {(formik) => (
            <>
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
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye ? CloseEye : EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => { setEye(!eye) }}
                    />
                  }
                  placeholder="Password"
                  name="password"
                  type={eye ? "text" : "password"}
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
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye1 ? CloseEye : EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => { setEye1(!eye1) }}
                    />
                  }
                  placeholder="Confirm Password"
                  name="cPassword"
                  type={eye1 ? "text" : "password"}
                />
                <Button type="submit" className="w-100 mt-3 h-56px">
                  Next
                </Button>
              </Form>
            </>
          )}
        </Formik>
        <p className="auth-subheading fw-bold text-center mt-5 text-dark">
          Already have an account?
          <Link
            to="/auth/service-provider/login"
            className="text-decoration-none fs-6"
          >
            <span className="forget ps-1">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProviderRegisterForm;