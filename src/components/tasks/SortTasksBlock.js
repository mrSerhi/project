import React from "react";
import { Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { setTaskFilter } from "../../store/task/task-actions";

const visibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_ACTIVE: "SHOW_ACTIVE",
  SHOW_COMPLETED: "SHOW_COMPLETED"
};

const SortTasksBlock = ({
  setTaskFilter,
  toggleModalRemoveTasks,
  tasks,
  visibilityFilter
}) => {
  return (
    <Card bg="info">
      <Card.Body className="text-white">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <span>
              {tasks.filter((task) => !task.done).length} task(s) left
            </span>

            <Button
              onClick={() => toggleModalRemoveTasks(true)}
              variant="link"
              className="text-warning"
            >
              Clear completed tasks
              <FontAwesomeIcon icon={faTrashAlt} size="sm" />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-around align-items-center">
            <ButtonGroup size="sm">
              <Button
                onClick={() => setTaskFilter(visibilityFilters.SHOW_ALL)}
                variant="outline-light"
                className={classnames({
                  active: visibilityFilter === visibilityFilters.SHOW_ALL
                })}
              >
                All
              </Button>
              <Button
                onClick={() => setTaskFilter(visibilityFilters.SHOW_ACTIVE)}
                variant="outline-light"
                className={classnames({
                  active: visibilityFilter === visibilityFilters.SHOW_ACTIVE
                })}
              >
                Active
              </Button>
              <Button
                onClick={() => setTaskFilter(visibilityFilters.SHOW_COMPLETED)}
                variant="outline-light"
                className={classnames({
                  active: visibilityFilter === visibilityFilters.SHOW_COMPLETED
                })}
              >
                Done
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// SortTasksBlock.propTypes = {
//   setTaskFilter: PropTypes.func.isRequired,
//   itemsFilter: PropTypes.string.isRequired,
//   tasks: PropTypes.arrayOf(PropTypes.object)
// };

const mapStateToProps = (state) => ({
  tasks: state.todo.tasks,
  visibilityFilter: state.todo.visibilityFilter
});

export default connect(
  mapStateToProps,
  { setTaskFilter }
)(SortTasksBlock);
