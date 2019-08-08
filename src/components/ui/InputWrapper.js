import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const InputWrapper = ({ id, label = null, name, error, children }) => {
  return (
    <Form.Group controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}

      {children}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback className="text-capitalized">
        {name || label} accepted
      </Form.Control.Feedback>
    </Form.Group>
  );
};

InputWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string
};

export default InputWrapper;
