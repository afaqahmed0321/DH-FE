import React, { useEffect, useState, useCallback } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../../shared/TextField";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import AreaIcon from "../../assets/images/icons/area.svg";
import SecIcon from "../../assets/images/icons/security.svg";
import OwnerIcon from "../../assets/images/icons/owner.svg";
import PaidIcon from "../../assets/images/icons/paid.svg";
import FlagIcon from "../../assets/images/icons/flag.svg";
import CCTVIcon from "../../assets/images/icons/cctv.svg";
import StafIcon from "../../assets/images/icons/staf.svg";
import ClimateIcon from "../../assets/images/icons/climate.svg";
import FuelIcon from "../../assets/images/icons/fuel.svg";
import RateIcon from "../../assets/images/icons/rate.svg";
import LocationIcon from "../../assets/images/icons/location.svg";
import DescIcon from "../../assets/images/icons/expiry.svg";
import SelectField from "../../shared/SelectField";
import "react-phone-input-2/lib/style.css";
import "../../assets/css/managerform.css";
import "../../assets/css/login-form.css";
import { useDropzone } from "react-dropzone";
import UploadImg from "../../assets/images/icons/upload.png";
import { getCategories, addUserSpace } from "../../store/storeIndex";
import Toast from "../../shared/Toast";
import PhoneInput from "react-phone-input-2"

const SpaceForm = ({ category, onHide }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.user.role);
  const userId = useSelector((state) => state.user.user._id);
  const catId = useSelector((state) => state.category?.categories?._id);

  const [docFiles, setDocFiles] = useState([]);
  const [loc, setLoc] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setDocFiles(acceptedFiles);
  }, []);

  const validValues = {
    area: "",
    security: "",
    owner: "",
    paidSecurity: "",
    parkingCapacity: "",
    cctv: "",
    paidStaff: "",
    climate: "",
    fuel: "",
    rateHour: "",
    rateDay: "",
    rateWeek: "",
    rateMonth: "",
    description: "",
  };

  const errorSchema = Yup.object().shape({
    area: Yup.number().required("Area is required"),
    security: Yup.string().required("Security type is required"),
    owner: Yup.string().required("This field is required"),
    paidSecurity: Yup.string().required("This field is required"),
    parkingCapacity: Yup.string().required("This field is required"),
    cctv: Yup.string().required("This field is required"),
    paidStaff: Yup.string().required("This field is required"),
    climate: Yup.string().required("This field is required"),
    fuel: Yup.string().required("This field is required"),
    rateHour: Yup.number().required("This field is required"),
    rateDay: Yup.number().required("This field is required"),
    rateWeek: Yup.number().required("This field is required"),
    rateMonth: Yup.number().required("This field is required"),
    description: Yup.string().required("Description is required"),
  });

  const spaceHandler = (values) => {
    if (docFiles.length === 0) {
      return Toast.error("Space images are required");
    }
    if (!category) {
      return Toast.error("Select space type");
    }
    if (!phone) {
      return Toast.error("Phone is required");
    }
    if (!loc) {
      return Toast.error("Address is required");
    }

    const data = new FormData();
    data.append("userId", userId);
    data.append("categoryId", catId);
    data.append("subCategoryId", category);
    data.append("area", values.area);
    data.append("contact", phone);
    data.append("security", values.security);
    data.append("cameras", values.cctv);
    data.append("ownerSite", values.owner);
    data.append("paidStaff", values.paidStaff);
    data.append("paidSecurity", values.paidSecurity);
    data.append("climateControl", values.climate);
    data.append("capacity", values.parkingCapacity);
    data.append("fuel", values.fuel);
    data.append("rate_hour", values.rateHour);
    data.append("rate_day", values.rateDay);
    data.append("rate_week", values.rateWeek);
    data.append("rate_month", values.rateMonth);
    data.append("location", loc.label);
    data.append("description", values.description);
    docFiles.map((file) => data.append("space_imgs", file));
    dispatch(addUserSpace(userId, data, token, onHide));
  };
  const roleValues = [
    { value: "Customer", option: "Customer" },
    { value: "Business Owner", option: "Business Owner" },
  ];
  const yesNoValues = [
    { value: true, option: "Yes" },
    { value: false, option: "No" },
  ];

  useEffect(() => {
    dispatch(getCategories(role, token));
  }, [role, token]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [phone, setPhone] = useState("921231231231");

  return (
    <div className="form-space px-0">
      <div className="mt-4">
        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={spaceHandler}
        >
          {({ touched, errors }) => (
            <Form>
              <Row>
                <Col xs="12" md="6">
                  <TextField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={AreaIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Enter Area Size in Sq. Yd"
                    name="area"
                    type="number"
                  />
                  <SelectField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={SecIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Security Type"
                    name="security"
                    defaulText="Security Type"
                    choices={roleValues}
                  />
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
                    placeholder="Owner lives on-site"
                    name="owner"
                    defaulText="Owner lives on-site"
                    choices={yesNoValues}
                  />
                  <SelectField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={PaidIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Paid Security on-site"
                    name="paidSecurity"
                    defaulText="Paid Security on-site"
                    choices={yesNoValues}
                  />
                  <TextField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={FlagIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Enter Parking Capacity"
                    name="parkingCapacity"
                    type="number"
                  />
                </Col>
                <Col xs="12" md="6">
                  <div className="d-flex flex-column mb-3">
                    <div className="input-style mb-2 h-100">
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
                  <SelectField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={CCTVIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="CCTV Cameras"
                    name="cctv"
                    defaulText="CCTV Cameras"
                    choices={yesNoValues}
                  />
                  <SelectField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={StafIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Paid Staff on-site"
                    name="paidStaff"
                    defaulText="Paid Staff on-site"
                    choices={yesNoValues}
                  />
                  <SelectField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={ClimateIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Climate  Controlled"
                    name="climate"
                    defaulText="Climate  Controlled"
                    choices={yesNoValues}
                  />
                  <SelectField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={FuelIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Fuel Availability"
                    name="fuel"
                    defaulText="Fuel Availability"
                    choices={yesNoValues}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs="6" lg="3">
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
                    placeholder="Rate / Hour"
                    name="rateHour"
                    type="number"
                  />
                </Col>
                <Col xs="6" lg="3">
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
                    placeholder="Rate / Day"
                    name="rateDay"
                    type="number"
                  />
                </Col>
                <Col xs="6" lg="3">
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
                    placeholder="Rate / Week"
                    name="rateWeek"
                    type="number"
                  />
                </Col>
                <Col xs="6" lg="3">
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
                    placeholder="Rate / Month"
                    name="rateMonth"
                    type="number"
                  />
                </Col>
              </Row>

              <Col className="p-0">
                <div className="mb-3 location">
                  <Image
                    fluid
                    className="field-icon"
                    src={LocationIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                  <GooglePlacesAutocomplete
                    apiKey= {process.env.REACT_APP_MAP_KEY}
                    selectProps={{
                      loc,
                      onChange: setLoc,
                    }}
                  />
                </div>
              </Col>
              <Col className="p-0">
                <TextField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={DescIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  placeholder="Add Description"
                  name="description"
                  type="text"
                />
              </Col>
              <p className="fw-bold mt-3">Upload Images</p>
              <div className="field-container dotted" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="d-flex align-items-center justify-content-center py-2">
                  <Image
                    fluid
                    className="me-3"
                    src={UploadImg} 
                    loading="lazy"
                  />
                  <p className="grey p-0 m-0">Choose File</p>
                </div>
              </div>
              {docFiles.length > 0 ? (
                <div>
                  {docFiles.map((file, index) => {
                    return (
                      <div key={index}>
                        <p className="text-muted">{file.name}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div>
                    <p className="text-muted">No file selected</p>
                  </div>
                </div>
              )}
              <Row className="justify-content-end mt-5 gap-sm-0 gap-3">
                <Col md="3" sm="4">
                  <Button onClick={onHide} className="btn-blue-outline w-100" >
                    Cancel
                  </Button>
                </Col>
                <Col md="3" sm="4">
                  <Button type="submit" className="btn-blue w-100">
                    Save
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

export default SpaceForm;
