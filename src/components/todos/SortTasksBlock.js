// import React from "react";
import React, { Component } from "react";
import { Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classnames from "classnames";

import SearchTaskForm from "./SearchTaskForm";

class SortTasksBlock extends Component {
  static propTypes = {
    onSetTaskFilter: PropTypes.func.isRequired
  };

  state = { selectedFilter: "all" };

  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
    this.props.onSetTaskFilter(filter);
  };

  render() {
    return (
      <Card bg="info" style={{ borderRadius: 0 }}>
        <Card.Body className="text-white">
          <SearchTaskForm setSearchQuery={this.props.setSearchQuery} />
          <Row>
            <Col className="d-flex flex-column align-items-end">
              <span>
                {this.props.tasks.filter((task) => !task.done).length} task(s)
                left
              </span>

              <Button
                onClick={this.props.openModal}
                variant="link"
                className="text-warning"
              >
                Clear completed tasks{" "}
                <FontAwesomeIcon icon={faTrashAlt} size="sm" />
              </Button>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-around align-items-center">
              {/* <SearchTaskForm setSearchQuery={this.props.setSearchQuery} /> */}

              <ButtonGroup size="sm">
                <Button
                  onClick={() => this.setFilter("all")}
                  variant="outline-light"
                  className={classnames({
                    active: this.state.selectedFilter === "all"
                  })}
                >
                  All
                </Button>
                <Button
                  onClick={() => this.setFilter("active")}
                  variant="outline-light"
                  className={classnames({
                    active: this.state.selectedFilter === "active"
                  })}
                >
                  Active
                </Button>
                <Button
                  onClick={() => this.setFilter("done")}
                  variant="outline-light"
                  className={classnames({
                    active: this.state.selectedFilter === "done"
                  })}
                >
                  Done
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default SortTasksBlock;
