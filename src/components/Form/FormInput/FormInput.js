import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ name, onChange, value, placeholder, type }) => {
  return (
    <input
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};

FormInput.defaultProps = {
  type: "text",
  placeholder: ""
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default FormInput;
