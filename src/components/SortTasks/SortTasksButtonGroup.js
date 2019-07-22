import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const _filters = ["all", "done", "active"];

const SortTasksButtonGroup = ({ handleGetTaskFilter }) => {
  return (
    <ButtonGroup size="sm" className="mt-4">
      {_filters.map(filter => (
        <Button
          key={filter}
          onClick={() => handleGetTaskFilter(filter.toLowerCase())}
          variant="info"
        >
          {filter}
        </Button>
      ))}
    </ButtonGroup>
  );
};

SortTasksButtonGroup.propTypes = {
  handleGetTaskFilter: PropTypes.func.isRequired
};

export default SortTasksButtonGroup;
