import React, { useState, useCallback } from "react";
import { Button, Image } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import LogoImg from "../../assets/images/logo.png";
import TextField from "../../shared/TextField";
import NameIcon from "../../assets/images/icons/company.png";
import LicIcon from "../../assets/images/icons/license.png";
import AddIcon from "../../assets/images/icons/address.png";
import "../../assets/css/login-form.css";
import { updateCompanyProfile } from "../../store/storeIndex";
import UploadImg from "../../assets/images/icons/upload.png";
import Toast from "../../shared/Toast";
import RegisterRadios from "../register/registerRadios";
import Indiviuals from "../../assets/images/icons/indiviuals";
import CompanyIcon from "../../assets/images/icons/company";

const BusinessInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.user.token);

    const [phno, setPhno] = useState("920123456789");
    const [docFiles, setDocFiles] = useState([]);
    const [category, setCategory] = useState("Individual");

    const validValues = {
        truckType: "",
        license: "",
        address: "",
    };

    const errorSchema = Yup.object().shape({
        truckType: Yup.string().required("Truck type name is required"),
        license: Yup.string().required("License number is required"),
        address: Yup.string().required("Address is required"),
    });

    const loginHandler = (values) => {
        if (!docFiles.length) {
            return Toast.error("License image is required");
        }
        if (!phno) {
            return Toast.error("Phone no is required");
        }
        const data = new FormData();
        data.append("driver_img", docFiles[0]);
        data.append("field", "CompanyInfo");
        data.append("companyPhone", phno);
        data.append("truckType", values.truckType);
        data.append("drivingLicense", values.license);
        data.append("driverAddress", values.address);

        dispatch(updateCompanyProfile(data, navigate, token));
    };

    const onDrop = useCallback((acceptedFiles) => {
        setDocFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const radio = [
        {
            id: "1",
            imgSrc: <Indiviuals />,
            text: "Individual",
        },
        {
            id: "2",
            imgSrc: <CompanyIcon />,
            text: "Company",
        },
    ];

    return (
        <div className="form-space px-sm-5 companyform" data-aos="fade-right">
            <Image fluid src={LogoImg} alt="Logo" loading="lazy" />

            <h2 className="auth-heading">
                Business <span className="auth-special">Info</span>
            </h2>
            <p className="auth-subheading">Enter your company’s information below.</p>

            <div className="d-flex gap-3">
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
            <div className="mt-3">
                <Formik
                    initialValues={validValues}
                    validationSchema={errorSchema}
                    onSubmit={loginHandler}
                >
                    {(formik, touched, errors) => (
                        <Form>
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
                                placeholder="Enter Truck Type"
                                name="truckType"
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
                            <TextField
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
                                placeholder="Driving License Number"
                                name="license"
                                type="text"
                            />
                            <TextField
                                icon={
                                    <Image
                                        fluid
                                        className="field-icon"
                                        src={AddIcon}
                                        loading="lazy"
                                        width={20}
                                        height={20}
                                    />
                                }
                                placeholder="Complete Address"
                                name="address"
                                type="text"
                            />

                            <p className="fw-bold mt-3">Upload Driving License</p>
                            <div className="field-container dotted" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="d-flex align-items-center justify-content-center py-2">
                                    <Image
                                        fluid
                                        className="me-3"
                                        src={UploadImg}
                                        loading="lazy"
                                    />
                                    <p className="grey p-0 m-0">Choose File / Drag & Drop Here</p>
                                </div>
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
    )
}

export default BusinessInfo;
