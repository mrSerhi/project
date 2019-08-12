import React from "react";
import PropTypes from "prop-types";
import { Alert, Card, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import "./TasksList.css";
import { connect } from "react-redux";
import * as taskActions from "../../../store/task/task-actions";
import { getPaginatedTasks } from "../../../store/task/selectors";

const TasksList = ({ tasks, updateTaskAndSave, removeTaskAndSave }) => {
  return (
    <Card style={{ height: "340px" }}>
      <Card.Body>
        {tasks.length ? (
          <ListGroup>
            {tasks.map(({ id, done, title }) => (
              <ListGroup.Item key={id} className="task-group-item">
                <div
                  onClick={() => updateTaskAndSave(id)}
                  className={classnames("task-item", {
                    "task-done": done
                  })}
                >
                  {title}
                </div>

                <Button
                  onClick={() => removeTaskAndSave(id)}
                  variant="link"
                  size="sm"
                  className="remove-task"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="secondary" className="mt-4 text-center">
            <FontAwesomeIcon icon={faBoxOpen} size="3x" />
            <p>Tasks list is empty...</p>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  updateTaskAndSave: PropTypes.func.isRequired,
  removeTaskAndSave: PropTypes.func.isRequired
};

export default connect(
  (state) => ({ tasks: getPaginatedTasks(state) }),
  { ...taskActions }
)(TasksList);
