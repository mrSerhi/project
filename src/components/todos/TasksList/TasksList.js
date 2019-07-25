import React from "react";
import { ListGroup, Button, Card, Alert } from "react-bootstrap";
import "./TasksList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from "../../../actions/tasks";
import PropTypes from "prop-types";

const TasksList = ({ tasks, removeTaskAction, updateTaskAction }) => {
  return (
    <Card style={{ height: "340px" }}>
      <Card.Body>
        {tasks && (
          <ListGroup variant="flush">
            {tasks.map((task) => (
              <ListGroup.Item key={task.id} className="task-group-item">
                <div
                  onClick={() => updateTaskAction(task.id)}
                  className={classnames("task-item", {
                    "task-done": task.done
                  })}
                >
                  {task.title}
                </div>

                <Button
                  onClick={() => removeTaskAction(task.id)}
                  variant="link"
                  size="sm"
                  className="task-remove__button"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {tasks.length === 0 && (
          <Alert variant="secondary text-center">
            Empty tasks bar...
            <p className="m-0">
              <FontAwesomeIcon icon={faBoxOpen} size="3x" />
            </p>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  removeTaskAction: PropTypes.func.isRequired,
  updateTaskAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ tasks: state.tasks });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(taskActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
