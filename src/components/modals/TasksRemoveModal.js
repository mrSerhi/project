import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const TasksRemoveModal = ({ toggleModalRemoveTasks, removeCompletedTasks }) => {
  return (
    <Modal show={true} onHide={() => toggleModalRemoveTasks(false)}>
      <Modal.Header closeButton>
        <h4>Are you sure?</h4>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">All completed tasks will be deleted!</p>

        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={removeCompletedTasks}
              variant="danger"
              className="mr-2"
            >
              Remove
            </Button>
            <Button
              onClick={() => toggleModalRemoveTasks(false)}
              variant="info"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default TasksRemoveModal;
