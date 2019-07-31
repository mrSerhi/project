import React from "react";
import { Col, InputGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchTaskForm = ({ setSearchQuery }) => {
  return (
    <Col xs={8} xl={6}>
      <h5>Search</h5>
      <InputGroup size="sm">
        <FormControl
          type="search"
          placeholder="Enter Searching task title..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
    </Col>
  );
};

SearchTaskForm.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
};

export default SearchTaskForm;
