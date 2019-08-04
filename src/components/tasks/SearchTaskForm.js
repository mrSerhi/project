import React from "react";
import { Col, InputGroup, FormControl, Card, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchTaskForm = ({ setSearchQuery }) => {
  return (
    <Card bg="info" text="light" className="mb-3">
      <Card.Body>
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <h5>Search</h5>
            <InputGroup size="sm">
              <FormControl
                type="search"
                placeholder="Enter Searching task title..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

SearchTaskForm.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
};

export default SearchTaskForm;
