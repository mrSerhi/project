import React from "react";
import { Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classnames from "classnames";

import SearchTaskForm from "./SearchTaskForm";

const SortTasksBlock = ({
  setTaskFilter,
  setSearchQuery,
  itemsFilter,
  tasksRemoveModalIn,
  tasks
}) => {
  return (
    <Card bg="info" style={{ borderRadius: 0 }}>
      <Card.Body className="text-white">
        <SearchTaskForm setSearchQuery={setSearchQuery} />
        <Row>
          <Col className="d-flex flex-column align-items-end">
            <span>
              {tasks.filter((task) => !task.done).length} task(s) left
            </span>

            <Button
              onClick={tasksRemoveModalIn}
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
  setSearchQuery: PropTypes.func.isRequired,
  itemsFilter: PropTypes.string.isRequired,
  tasksRemoveModalIn: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default SortTasksBlock;
