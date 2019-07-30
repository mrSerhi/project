import React, { Component } from "react";
import uuid from "uuid";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
});

class SignUpForm extends Component {
  state = { username: "", email: "", password: "", showModal: false };

  handleSubmitForm = (values, actions) => {
    this.setState({ showModal: false });
    const { username, email } =
      JSON.parse(localStorage.getItem("userdata")) || {};

    if (username === values.username) {
      actions.setFieldError("username", "User is already exist!");
      return;
    }

    if (email === values.email) {
      actions.setFieldError("email", "Email is already exist!");
      return;
    }

    localStorage.setItem(
      "userdata",
      JSON.stringify({
        id: uuid(),
        username: values.username.toLowerCase(),
        email: values.email,
        password: values.password
      })
    );
    actions.resetForm(this.state);
    this.setState({ showModal: true });
  };

  render() {
    return (
      <>
        <Modal show={this.state.showModal}>
          <Modal.Body className="text-center">
            <h4 className="text-success">Registration is successfuly done!</h4>
            <p>Want to go to the login page?</p>

            <Modal.Footer>
              <Button
                onClick={() => this.props.history.push("/login")}
                variant="info"
              >
                Log in
              </Button>
              <Button
                onClick={() => this.setState({ showModal: false })}
                variant="danger"
              >
                Stay here
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

        <Container>
          <Row>
            <Col sm={{ span: 6, offset: 3 }} className="mt-5">
              <Card>
                <Card.Body>
                  <h3 className="display-4 text-center">Sign Up</h3>
                  <Formik
                    initialValues={this.state}
                    validationSchema={signUpSchema}
                    onSubmit={this.handleSubmitForm}
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
                            placeholder="Choose a username"
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
                            placeholder="Choose a email address"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="validationUserPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password && touched.password}
                            placeholder="Type a password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" variant="info">
                          Sign Up
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SignUpForm;
