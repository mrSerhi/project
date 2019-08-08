import React, { Component } from "react";
import PropTypes from "prop-types";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import RestoreEmailForm from "../tasks/RestoreEmailForm";
import FormInput from "../ui/FormInput";
import { connect } from "react-redux";
import { logInAndSave } from "../../store/auth/auth-actions";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
});

class LoginForm extends Component {
  static propTypes = {
    logInAndSave: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  state = {
    email: "",
    password: "",
    restoreEmailModalIn: false
  };

  handleSubmitForm = (values, actions) => {
    const { email, password } = values;
    const { users, logInAndSave, history } = this.props;
    const isAuth = users.find((user) => user.email === email);
    const errors = {};

    if (isAuth === undefined || !Object.keys(isAuth).length) {
      errors.email = "User is not found...";
      errors.password = "Password is not found";
    } else {
      if (isAuth.password !== password) {
        errors.email = "Try to change email or password";
        errors.password = "Email or password is invalid...";
      }
    }

    if (!Object.keys(errors).length) {
      actions.resetForm(this.state);
      logInAndSave(isAuth);

      history.push("/");
    } else {
      return actions.setErrors(errors);
    }
  };

  toggleRestoreModal = (status = false) => {
    this.setState({ restoreEmailModalIn: status });
  };

  render() {
    const { restoreEmailModalIn } = this.state;
    const { users } = this.props;
    return (
      <Container className="mb-5">
        {restoreEmailModalIn && (
          <Modal
            show={restoreEmailModalIn}
            onHide={() => this.toggleRestoreModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Restore Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RestoreEmailForm users={users} />
            </Modal.Body>
          </Modal>
        )}

        <Row>
          <Col sm={{ span: 8, offset: 2 }} className="mt-5">
            <Alert variant="warning" className="mb-5 text-center">
              <p className="lead">To use the Tasks you must be authorized</p>
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
                        Log In <FontAwesomeIcon icon={faPaperPlane} />
                      </Button>

                      <Button
                        variant="link"
                        onClick={() => this.toggleRestoreModal(true)}
                      >
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
    );
  }
}

export default connect(
  (state) => ({ users: state.auth.users }),
  { logInAndSave }
)(LoginForm);
