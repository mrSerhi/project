import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const FormInput = ({ id, label = null, errors, touched, ...props }) => {
  return (
    <Form.Group controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...props}
        isInvalid={!!errors[props.name] && touched[props.name]}
        isValid={touched[props.name] && !errors[props.name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[props.name]}
      </Form.Control.Feedback>
      <Form.Control.Feedback>
        {props.name.toUpperCase()} accepted
      </Form.Control.Feedback>
    </Form.Group>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default FormInput;
