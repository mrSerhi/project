import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class AddTaskForm extends Component {
  static propTypes = {
    handleAddTask: PropTypes.func.isRequired,
    setAllTasksAsCompleted: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { title: "" };

    this.input = React.createRef();
  }

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
    this.input.current.focus();
  };

  handleTitleChanges = e => this.setState({ title: e.target.value });

  render() {
    return (
      <Form onSubmit={this.addTaskOnSubmit}>
        <InputGroup size="lg" className="mb-2">
          <InputGroup.Prepend>
            <Button
              onClick={this.props.setAllTasksAsCompleted}
              variant="outline-info"
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
          </InputGroup.Prepend>
          <FormControl
            placeholder="What needs to be done?"
            aria-label="Add user task"
            aria-describedby="basic-addon2"
            onChange={this.handleTitleChanges}
            value={this.state.title}
            ref={this.input}
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
