import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Alert
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required")
});

class LoginForm extends Component {
  state = { password: "", email: "", isLogged: false };

  handleSubmitForm = (values, actions) => {
    const { email, password } = values;
    const users = JSON.parse(localStorage.getItem("users"));
    const errors = {};
    let currentUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (currentUser === undefined) {
      errors.email = "User is not found...Try to change email and password";
    }

    if (!Object.keys(errors).length) {
      // set to localStorage currently logged user
      localStorage.setItem(
        "current-user",
        JSON.stringify({
          ...currentUser,
          isLogged: true
        })
      );

      actions.resetForm(this.state);
      this.setState({ isLogged: true });
      setTimeout(() => this.props.history.push("/"), 1500);
    } else {
      return actions.setErrors(errors);
    }
  };

  render() {
    if (this.state.isLogged) {
      return (
        <Container>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mt-5 text-center">
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="info" />

              <p className="text-muted">Preparing Todos</p>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className="mb-5">
        <Row>
          <Col sm={{ span: 8, offset: 2 }} className="mt-5">
            <Alert variant="warning" className="mb-5 text-center">
              <p className="lead">To use the Todos you must be authorized</p>
              <p className="lead">
                If you not registered yet, you can follow{" "}
                <Link to="/sign-up">Sign Up</Link> and create accound
              </p>
            </Alert>
          </Col>
        </Row>

        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="mt-2">
            <Card>
              <Card.Body>
                <h3 className="display-4 text-center">Log In</h3>

                <Formik
                  initialValues={this.state}
                  onSubmit={this.handleSubmitForm}
                  validationSchema={signInSchema}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="validationUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email && touched.email}
                          placeholder="your.awesome@gmail.com"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="validationPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password && touched.password}
                          placeholder="Password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button type="submit" variant="info">
                        Sign In
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
