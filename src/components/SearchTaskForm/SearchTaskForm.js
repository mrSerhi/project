import React, { Component } from "react";
import { Col, InputGroup, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchTaskForm extends Component {
  static propTypes = {
    setSearchQuery: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }
  getSearchQueryOnChange = () => {
    this.props.setSearchQuery(this.searchInput.current.value);
  };
  render() {
    return (
      <Col sm={4}>
        <InputGroup>
          <InputGroup.Prepend>
            <Button variant="dark">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup.Prepend>

          <FormControl
            type="search"
            placeholder="Enter Search task"
            aria-label="Search users task"
            aria-describedby="basic-addon2"
            onChange={this.getSearchQueryOnChange}
            ref={this.searchInput}
          />
        </InputGroup>
      </Col>
    );
  }
}

export default SearchTaskForm;
