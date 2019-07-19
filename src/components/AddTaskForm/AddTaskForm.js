import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";
import { Card, Form, InputGroup, FormControl, Button } from "react-bootstrap";

class AddTaskForm extends Component {
  static propTypes = {
    handleAddTask: PropTypes.func.isRequired
  };

  state = { title: "" };

  addTaskOnSubmit = e => {
    e.preventDefault();
    const newTask = {
      id: uuid(),
      title: this.state.title
    };
    this.props.handleAddTask(newTask);

    // clear input field
    this.setState({ title: "" });
  };

  handleTitleChanges = e => this.setState({ title: e.target.value });

  render() {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={this.addTaskOnSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Add your task"
                aria-label="Add user task"
                aria-describedby="basic-addon2"
                onChange={this.handleTitleChanges}
                value={this.state.title}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Ok
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default AddTaskForm;
