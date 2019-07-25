import React, { Component } from "react";
import { Col, InputGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

class SearchTaskForm extends Component {
  static propTypes = {
    setSearchQuery: PropTypes.func.isRequired
  };
  getQueryOnChange = (e) => {
    this.props.setSearchQuery(e.target.value);
  };

  render() {
    return (
      <Col xs={8} xl={6}>
        <h5>Search</h5>
        <InputGroup size="sm">
          <FormControl
            type="search"
            placeholder="Enter Searching task title..."
            onChange={this.getQueryOnChange}
          />
        </InputGroup>
      </Col>
    );
  }
}

export default SearchTaskForm;
