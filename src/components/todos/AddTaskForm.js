import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addTaskAction } from "../../actions/tasks";

class AddTaskForm extends Component {
  static propTypes = {
    addTaskAction: PropTypes.func.isRequired
  };

  state = { title: "" };

  addTask = (e) => {
    e.preventDefault();

    if (this.state.title.trim() === "") return;

    const newTask = {
      title: this.state.title,
      done: false
    };
    this.props.addTaskAction(newTask);

    // clear input field
    this.setState({ title: "" });
  };

  setTitleOnChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <Form onSubmit={this.addTask}>
        <InputGroup size="lg" className="mb-2">
          <FormControl
            placeholder="What needs to be done?"
            onChange={this.setTitleOnChange}
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

export default connect(
  null,
  { addTaskAction }
)(AddTaskForm);
