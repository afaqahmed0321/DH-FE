import React from "react";

import { Form } from "react-bootstrap";
import "../../assets/css/login-form.css";


const RegisterRadios = ({ data, setCategory, category }) => {
  return (
    <div className="register-form-space mt-5" key={data.index}>
      <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
        <div className="d-flex justify-content-between button align-items-center w-auto">
          <div>
            <Form.Check
              checked={category === data.text}
              onChange={() => {
                setCategory(data.text);
              }}
              inline
              label={
                <>
                  {data.imgSrc}
                  {data.text}
                </>
              }
              name="group1"
              type="radio"
              id={`inline-radio-${data.id}`}
              className="p-0 m-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRadios;