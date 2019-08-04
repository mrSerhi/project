import React from "react";
import { Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classnames from "classnames";

const SortTasksBlock = ({
  setTaskFilter,
  itemsFilter,
  toggleModalRemoveTasks,
  tasks
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
                onClick={() => setTaskFilter("all")}
                variant="outline-light"
                className={classnames({
                  active: itemsFilter === "all"
                })}
              >
                All
              </Button>
              <Button
                onClick={() => setTaskFilter("active")}
                variant="outline-light"
                className={classnames({
                  active: itemsFilter === "active"
                })}
              >
                Active
              </Button>
              <Button
                onClick={() => setTaskFilter("done")}
                variant="outline-light"
                className={classnames({
                  active: itemsFilter === "done"
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

SortTasksBlock.propTypes = {
  setTaskFilter: PropTypes.func.isRequired,
  itemsFilter: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default SortTasksBlock;
