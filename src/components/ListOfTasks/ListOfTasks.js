import React from "react";
import PropTypes from "prop-types";
import { Alert, ListGroup } from "react-bootstrap";

const ListOfTasks = ({ tasks }) => {
  return (
    <>
      {tasks.length !== 0 ? (
        <ListGroup className="mt-4">
          {tasks.map(t => (
            <ListGroup.Item key={t.id}>{t.title}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info" className="mt-4 text-center">
          No one tasks is found...
        </Alert>
      )}
    </>
  );
};

ListOfTasks.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default ListOfTasks;
