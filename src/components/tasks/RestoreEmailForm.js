import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../ui/FormInput";

const restoreEmailSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name is required")
});

class RestoreEmailForm extends Component {
  state = {
    username: "",
    password: "",
    sendVerification: false
  };

  handleSubmitForm = (values, actions) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.username === values.username);
    const errors = {};

    if (user === undefined) {
      errors.username = "No user with this name found";
    }

    if (!Object.keys(errors).length) {
      this.setState({ sendVerification: true });
      actions.resetForm(this.state);
    } else {
      return actions.setErrors(errors);
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="warning" className="mb-2">
              <p className="lead text-center">
                For restoring email you should enter yours currently{" "}
                <span className="text-danger">Username</span> and{" "}
              </p>
            </Alert>

            <Formik
              initialValues={this.state}
              onSubmit={this.handleSubmitForm}
              validationSchema={restoreEmailSchema}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <FormInput
                    id="validation-username-restore-form"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    label="Username"
                    placeholder="Type your username"
                  />

                  <Button type="submit" variant="info">
                    Restore
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RestoreEmailForm;
