import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const TasksListGroup = ({ tasks, handleRemoveTask }) => {
  return (
    <ListGroup className="mt-4">
      {tasks.map(t => (
        <ListGroup.Item
          key={t.id}
          className="d-flex justify-content-between align-items-center"
        >
          <span className="text-uppercase">{t.title}</span>

          <Button
            onClick={() => handleRemoveTask(t.id)}
            variant="danger"
            size="sm"
          >
            x
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

TasksListGroup.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleRemoveTask: PropTypes.func.isRequired
};

export default TasksListGroup;
