import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";

// components
import FormInput from "./FormInput/FormInput";

class Form extends Component {
  state = { title: "" };

  handleOnSubmit = e => {
    e.preventDefault();
    const { title } = this.state;
    const item = {
      id: uuid(),
      title
    };
    this.props.mapTitleToItems(item);

    // clear input field
    this.setState({ title: "" });
  };

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title } = this.state;
    return (
      <div className="card card-body mt-5 bg-light">
        <form onSubmit={this.handleOnSubmit}>
          <FormInput
            name="title"
            value={title}
            placeholder="You can add yours title"
            onChange={this.handleOnChange}
          />
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  mapTitleToItems: PropTypes.func.isRequired
};

export default Form;
