import React, { Component } from "react";
import { Card, InputGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

class SearchTaskForm extends Component {
  static propTypes = {
    getSearchQuery: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }
  getSearchQueryOnChange = () => {
    this.props.getSearchQuery(this.searchInput.current.value);
  };
  render() {
    return (
      <Card border="info">
        <Card.Body>
          <Card.Title>Search Task</Card.Title>
          <InputGroup className="mb-3">
            <FormControl
              type="search"
              placeholder="Enter Search task"
              aria-label="Search users task"
              aria-describedby="basic-addon2"
              onChange={this.getSearchQueryOnChange}
              ref={this.searchInput}
            />
          </InputGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchTaskForm;
