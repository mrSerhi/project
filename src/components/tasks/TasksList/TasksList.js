import React from "react";
import { Alert, Card, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import "./TasksList.css";

const TasksList = ({ tasks, removeTask, toggleTaskDone }) => {
  return (
    <Card style={{ height: "340px" }}>
      <Card.Body>
        {tasks.length ? (
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.id} className="task-group-item">
                <div
                  onClick={() => toggleTaskDone(task.id)}
                  className={classnames("task-item", {
                    "task-done": task.done
                  })}
                >
                  {task.title}
                </div>

                <Button
                  onClick={() => removeTask(task.id)}
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

export default TasksList;
