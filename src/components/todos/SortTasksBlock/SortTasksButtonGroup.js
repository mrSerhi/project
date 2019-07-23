import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

class SortTasksButtonGroup extends Component {
  static propTypes = {
    handleGetTaskFilter: PropTypes.func.isRequired
  };
  state = { selectedFilter: "all" };

  setFilter = filter => {
    this.setState({ selectedFilter: filter });
    this.props.handleGetTaskFilter(filter);
  };

  render() {
    return (
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
    );
  }
}

export default SortTasksButtonGroup;
