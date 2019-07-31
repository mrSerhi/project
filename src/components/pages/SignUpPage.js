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

// validation YUP schema
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
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be the same")
    .required("Confirm Password is required")
});

class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showModal: false
  };

  handleSubmitForm = (values, actions) => {
    const registaredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const errors = {};

    if (registaredUsers.length > 0) {
      registaredUsers.find((user) => {
        if (user.username === values.username) {
          return (errors.username = "Username already exist");
        }

        if (user.email === values.email) {
          return (errors.email = "Email already exist");
        }

        return user;
      });
    }

    if (!Object.keys(errors).length) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          ...registaredUsers,
          {
            id: uuid(),
            username: values.username,
            email: values.email,
            password: values.password
          }
        ])
      );
      actions.resetForm(this.state);
      this.setState({ showModal: true });
    } else {
      return actions.setErrors(errors);
    }
  };

  hideModal = () => this.setState({ showModal: false });

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.hideModal}>
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
              <Button onClick={this.hideModal} variant="danger">
                Stay here
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

        <Container className="mb-5">
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

                        <Form.Group controlId="validationUserConfirmPassword">
                          <Form.Label>Сonfirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={
                              !!errors.confirmPassword &&
                              touched.confirmPassword
                            }
                            placeholder="Сonfirm Password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
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
