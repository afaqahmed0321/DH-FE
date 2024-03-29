import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.png';
import TextField from '../../shared/TextField';
import OtpIcon from '../../assets/images/icons/otp.png';
import '../../assets/css/login-form.css';
import { hiddenEmail } from '../../helpers/hiddenEmail';
import { verifyOtp } from '../../store/storeIndex';

const OTPForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();

    const [hiddenEmailValue, setHiddenEmailValue] = useState('');
    const [counter, setCounter] = useState(60);

    const validValues = {
        otp: ''
    };

    const errorSchema = Yup.object().shape({
        otp: Yup.string().required('OTP is required')
    });

    const loginHandler = (values) => {
        const data = {
            email: state.email,
            otp: values.otp
        };
        dispatch(verifyOtp(data, navigate, state.moveTo, state.role));
    }

    useEffect(() => {
        setHiddenEmailValue(hiddenEmail(state.email));
    }, [state.email]);

    useEffect(() => {
        let timeCounter
        if (counter > 0) {
            timeCounter = setTimeout(() => setCounter(counter - 1), 1000);
        }

        return () => {
            clearTimeout(timeCounter);
        };
    }, [counter]);

    return (
        <div className='form-space' data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6"  className="d-none d-md-block"/>


            <h2 className='auth-heading'>Verify <span className='auth-special'>OTP</span></h2>
            <p className='auth-subheading'>{`A 6-digit code sent to your ${hiddenEmailValue}`}</p>

            <div className='mt-5'>
                <Formik
                    initialValues={validValues}
                    validationSchema={errorSchema}
                    onSubmit={loginHandler}
                >
                    {(formik) => (
                        <Form>
                            <TextField icon={<Image fluid className='field-icon' src={OtpIcon} loading='lazy' width={20} height={20} />} placeholder='Enter Email OTP' name='otp' type='text' />
                            <Button type='submit' className='w-100 mt-3'>
                                Verify
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className='auth-subheading fw-bold text-center mt-5 text-dark'>Re-send code in <span className='forget'>{`${counter}s`}</span></p>
            </div>
        </div>
    )
}

export default OTPForm;
