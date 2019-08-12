import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addTaskAndSave } from "../../store/task/task-actions";

const AddTaskForm = ({ addTaskAndSave }) => {
  const [title, setTitle] = useState("");
  const addTaskOnSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return false;
    }

    addTaskAndSave({ title });
    // clear search field
    setTitle("");
  };
  return (
    <Form onSubmit={addTaskOnSubmit}>
      <InputGroup size="lg" className="mb-2">
        <FormControl
          placeholder="What needs to be done?"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />

        <InputGroup.Append>
          <Button variant="dark" type="submit">
            Ok
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

AddTaskForm.propTypes = {
  addTaskAndSave: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTaskAndSave }
)(AddTaskForm);
