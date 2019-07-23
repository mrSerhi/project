import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

const _filters = ["All", "Done", "Active"];

const SortTasksButtonGroup = ({ handleGetTaskFilter, selectedFilter }) => {
  return (
    <ButtonGroup size="sm">
      {_filters.map(filter => (
        <Button
          key={filter}
          onClick={() => handleGetTaskFilter(filter.toLowerCase())}
          variant="outline-light"
          className={classnames({
            active: filter.toLowerCase() === selectedFilter
          })}
        >
          {filter}
        </Button>
      ))}
    </ButtonGroup>
  );
};

SortTasksButtonGroup.propTypes = {
  handleGetTaskFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired
};

export default SortTasksButtonGroup;
