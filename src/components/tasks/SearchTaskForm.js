import React from "react";
import { Col, InputGroup, FormControl, Card, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearchTerm } from "../../store/task/task-actions";

const SearchTaskForm = ({ getSearchTerm }) => {
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
                onChange={(e) => getSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

SearchTaskForm.propTypes = {
  getSearchTerm: PropTypes.func.isRequired
};

export default connect(
  null,
  { getSearchTerm }
)(SearchTaskForm);
