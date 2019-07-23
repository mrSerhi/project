import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

class AddTaskForm extends Component {
  static propTypes = {
    handleAddTask: PropTypes.func.isRequired
  };

  state = { title: "" };

  addTaskOnSubmit = e => {
    e.preventDefault();
    const newTask = {
      id: uuid(),
      title: this.state.title,
      done: false
    };
    this.props.handleAddTask(newTask);

    // clear input field
    this.setState({ title: "" });
  };

  handleTitleChanges = e => this.setState({ title: e.target.value });
  checkOnCompletedTasks = () => {
    const { tasks } = this.props;
    return tasks.filter(task => task.done).length === tasks.length;
  };

  render() {
    return (
      <Form onSubmit={this.addTaskOnSubmit}>
        <InputGroup size="lg" className="mb-2">
          <FormControl
            placeholder="What needs to be done?"
            onChange={this.handleTitleChanges}
            value={this.state.title}
          />

          <InputGroup.Append>
            <Button variant="dark" type="submit">
              Ok
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default AddTaskForm;
