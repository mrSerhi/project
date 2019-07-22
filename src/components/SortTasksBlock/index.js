import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import SortTasksButtonGroup from "./SortTasksButtonGroup";

const SortTasksBlock = ({
  activeTasksLength,
  completedTasksLength,
  selectedFilter,
  handleGetTaskFilter,
  handleClearComplatedTasks
}) => {
  return (
    <Card bg="info" style={{ borderRadius: 0 }}>
      <Card.Body className="text-white justify-content-around">
        <span className="d-block">
          {activeTasksLength > 1
            ? `${activeTasksLength} tasks left`
            : `${activeTasksLength} task left`}
        </span>

        <SortTasksButtonGroup
          handleGetTaskFilter={handleGetTaskFilter}
          selectedFilter={selectedFilter}
        />

        {completedTasksLength > 1 && (
          <Button
            onClick={handleClearComplatedTasks}
            variant="link"
            className="text-warning"
          >
            Clear completed tasks{" "}
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SortTasksBlock;
