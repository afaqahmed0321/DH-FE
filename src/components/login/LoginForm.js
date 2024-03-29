
import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LoginSocialGoogle } from 'reactjs-social-login';

import LogoImg from '../../assets/images/logo.png';
import TextField from '../../shared/TextField';
import RateIcon from '../../assets/images/icons/@.png';
import PassIcon from '../../assets/images/icons/lock.png';
import EyeIcon from '../../assets/images/icons/eye.svg';
import CloseEye from '../../assets/images/icons/closeeye.png';
import '../../assets/css/login-form.css';
import { userLogin } from '../../store/storeIndex';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validValues = {
    email: "",
    password: "",
  };

  const errorSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginHandler = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    dispatch(userLogin(data, navigate));
  };

  const [eye, setEye] = useState(false);

  return (
    <div className="form-space px-sm-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6"  className="d-none d-md-block"/>

      <h2 className="auth-heading">
        Welcome <span className="auth-special">Back!</span>
      </h2>
      <p className="auth-subheading">Login to your account again.</p>

      <div className="mt-5">
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
              <Link to="/auth/forget-password">
                <p className="forget">Forget Password?</p>
              </Link>
              <Button type="submit" className="w-100 mt-3 h-56px">
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <p className="auth-subheading text-center my-3">OR</p>
        <LoginSocialGoogle
          client_id={
            "643396070667-bfebpofn127mm7krc7c4iamdu5ejckig.apps.googleusercontent.com"
          }
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log(provider, data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <Button className="w-100 fw-bold" variant="light">
            <FcGoogle className="fs-3 me-2 h-56px" />
            Login With Google
          </Button>
        </LoginSocialGoogle>
        <p className="auth-subheading fw-bold text-center mt-5 text-dark">
          Don’t have an account?
          <Link to="/auth/customer/register" className="text-decoration-none">
            <span className="forget fs-6">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
