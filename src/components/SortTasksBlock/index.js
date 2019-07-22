import React from "react";
import { Card } from "react-bootstrap";

import SortTasksButtonGroup from "./SortTasksButtonGroup";

const SortTasksBlock = ({
  activeTasksLength,
  selectedFilter,
  handleGetTaskFilter
}) => {
  return (
    <Card bg="info" style={{ borderRadius: 0 }}>
      <Card.Body className="text-white">
        <span className="mr-5">
          {activeTasksLength > 1
            ? `${activeTasksLength} tasks left`
            : `${activeTasksLength} task left`}
        </span>

        <SortTasksButtonGroup
          handleGetTaskFilter={handleGetTaskFilter}
          selectedFilter={selectedFilter}
        />
      </Card.Body>
    </Card>
  );
};

export default SortTasksBlock;
