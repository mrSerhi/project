import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import SortTasksButtonGroup from "./SortTasksButtonGroup";

const SortTasksBlock = ({
  activeTasksLength,
  completedTasksLength,
  selectedFilter,
  handleGetTaskFilter,
  handleRemovingCompletedTasks
}) => {
  return (
    <Card bg="info" style={{ borderRadius: 0 }}>
      <Card.Body className="text-white">
        <Row>
          <Col className="d-flex justify-content-around align-items-center">
            <span>
              {activeTasksLength > 1
                ? `${activeTasksLength} tasks left`
                : `${activeTasksLength} task left`}
            </span>

            <SortTasksButtonGroup
              handleGetTaskFilter={handleGetTaskFilter}
              selectedFilter={selectedFilter}
            />
          </Col>
        </Row>

        {completedTasksLength >= 1 && (
          <Button
            onClick={handleRemovingCompletedTasks}
            variant="link"
            className="text-warning mx-auto"
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
