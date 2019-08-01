import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Modal
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import RestoreEmailForm from "../todo/RestoreEmailForm";
import FormInput from "../ui/FormInput";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
});

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    showModal: false
  };

  handleSubmitForm = (values, actions) => {
    const { email, password } = values;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const errors = {};
    let currentUser = users.find((user) => user.email === email);

    if (currentUser === undefined) {
      errors.email =
        "User not found. Maybe you're not register yet. If you forgot email, try to restore it";
    }

    if (currentUser !== undefined && currentUser.password !== password) {
      errors.password = "Wrong password. Type yours account password";
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

  showModal = () => this.setState({ showModal: true });
  hideModal = () => this.setState({ showModal: false });

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Restore Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RestoreEmailForm />
          </Modal.Body>
        </Modal>

        <Container className="mb-5">
          <Row>
            <Col sm={{ span: 8, offset: 2 }} className="mt-5">
              <Alert variant="warning" className="mb-5 text-center">
                <p className="lead">To use the Todo you must be authorized</p>
                <p className="lead">
                  If you not registered yet, you can follow{" "}
                  <Link to="/sign-up">Sign Up</Link> and create account
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
                        <FormInput
                          id="validate-login-email"
                          label="Email"
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          errors={errors}
                          touched={touched}
                          placeholder="your.awesome@gmail.com"
                        />

                        <FormInput
                          id="validate-login-password"
                          label="Password"
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          errors={errors}
                          touched={touched}
                          placeholder="Password"
                        />

                        <Button type="submit" variant="info">
                          Log In
                        </Button>

                        <Button variant="link" onClick={this.showModal}>
                          Forgot email?
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

export default LoginForm;
