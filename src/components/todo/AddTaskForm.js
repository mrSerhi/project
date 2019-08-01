import React, { useState } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const AddTaskForm = ({ handleAddTask }) => {
  const [title, setTitle] = useState("");
  const addTaskOnSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") return;

    const newTask = {
      id: uuid(),
      title,
      done: false
    };

    handleAddTask(newTask);

    // clear search field
    setTitle("");
  };
  const changeTitleOnChange = (e) => setTitle(e.currentTarget.value);
  return (
    <Form onSubmit={addTaskOnSubmit}>
      <InputGroup size="lg" className="mb-2">
        <FormControl
          placeholder="What needs to be done?"
          onChange={changeTitleOnChange}
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
  handleAddTask: PropTypes.func.isRequired
};

export default AddTaskForm;
