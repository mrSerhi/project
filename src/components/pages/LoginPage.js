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
  username: Yup.string()
    .trim()
    .lowercase()
    .min(2, "Name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name field is required"),
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email field is required")
});

class LoginForm extends Component {
  state = { username: "", email: "", isLogged: false };

  handleSubmitForm = (values, actions) => {
    const { username, email } = values;
    const userData = JSON.parse(localStorage.getItem("userdata"));

    if (userData.username !== username) {
      actions.setFieldError("username", "Name is not exist");
      return;
    }

    if (userData.email !== email) {
      actions.setFieldError("email", "Email is not exist");
      return;
    }

    actions.resetForm(this.state);
    this.setState({ isLogged: true });
    // set user like was auth
    userData.isLogged = true;
    localStorage.setItem("userdata", JSON.stringify(userData));
    setTimeout(() => this.props.history.push("/"), 1500);
  };

  componentDidMount() {
    this.setState({ userdata: JSON.parse(localStorage.getItem("userdata")) });
  }

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
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="mt-5">
            <Alert variant="warning" className="mb-5 text-center">
              <p className="lead">To use the Todos you must be authorized</p>
              <p className="lead">
                If you not registered yet, you can follow the link{" "}
                <Link to="/sign-up">Sign Up</Link>
              </p>
            </Alert>
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
                      <Form.Group controlId="validationUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username && touched.username}
                          placeholder="Username"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

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
