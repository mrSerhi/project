import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const restoreEmailSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
});

class RestoreEmailForm extends Component {
  state = {
    username: "",
    password: "",
    restored: false,
    email: "",
    notFindedUser: false
  };

  handleSubmitForm = (values, actions) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const { username, password } = values;
    const findedUser = users.find((user) => user.username === username);
    const errors = {};

    if (findedUser === undefined) {
      this.setState({ notFindedUser: true, restored: false });
      return;
    } else if (findedUser !== undefined && findedUser.password !== password) {
      errors.password = "Wrong password. Type yours accound password";
    }

    if (!Object.keys(errors).length) {
      // set restored email address to state
      this.setState({
        email: findedUser.email,
        restored: true,
        notFindedUser: false
      });
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
                <span className="text-danger">Password</span>
              </p>
            </Alert>

            <Formik
              initialValues={this.state}
              onSubmit={this.handleSubmitForm}
              validationSchema={restoreEmailSchema}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="validationUsernameRestoreForm">
                    <Form.Label>
                      Username<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username && touched.username}
                      isValid={touched.username && !errors.username}
                      placeholder="Type your username"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback>
                      Username accepted
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="validationPasswordRestoreForm">
                    <Form.Label>
                      Password<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password && touched.password}
                      isValid={touched.password && !errors.password}
                      placeholder="Type your password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback>
                      Password accepted
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="info">
                    Restore
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>

        <Row>
          <Col className="mt-5">
            <Alert variant="success">
              Your email: {this.state.restored && <b>{this.state.email}</b>}
            </Alert>

            {!!this.state.notFindedUser && (
              <Alert variant="danger">
                User is not found... Try <Link to="/sign-up">Sign Up</Link>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RestoreEmailForm;
