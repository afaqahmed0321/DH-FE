import React from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.png';
import TextField from '../../shared/TextField';
import PassIcon from '../../assets/images/icons/lock.png';
import '../../assets/css/login-form.css';
import { resetPassword } from '../../store/storeIndex';

const ResetPasswordForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();

    const validValues = {
        password: '',
        cPassword: '',
    };

    const errorSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password must be 8 characters long').required('Password is required'),
        cPassword: Yup.string().oneOf([Yup.ref('password')], 'Must match "password" field value').required('Confirm password is required'),
    });

    const loginHandler = (values) => {
        const data = {
            email: state.email,
            password: values.password,
            passwordConfirm: values.cPassword
        };
        dispatch(resetPassword(data, navigate));
    }

    return (
        <div className='form-space px-sm-5'>
            <Image fluid src={LogoImg} alt='Logo' loading='lazy' />

            <h2 className='auth-heading'>Reset <span className='auth-special'>Password</span></h2>
            <p className='auth-subheading'>Create your new password.</p>

            <div className='mt-5'>
                <Formik
                    initialValues={validValues}
                    validationSchema={errorSchema}
                    onSubmit={loginHandler}
                >
                    {(formik) => (
                        <Form>
                            <TextField icon={<Image fluid className='field-icon' src={PassIcon} loading='lazy' width={20} height={20} />} placeholder='Password' name='password' type='password' />
                            <TextField icon={<Image fluid className='field-icon' src={PassIcon} loading='lazy' width={20} height={20} />} placeholder='Confirm Password' name='cPassword' type='password' />
                            <Button type='submit' className='w-100 mt-3 h-56px'>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ResetPasswordForm;
