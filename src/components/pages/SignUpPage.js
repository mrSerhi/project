import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import InputWrapper from "../ui/InputWrapper";
import { connect } from "react-redux";
import { signUpAndSave } from "../../store/auth/auth-actions";

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
  static propTypes = {
    signUpAndSave: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleSubmitForm = (values, actions) => {
    const errors = {};
    const { users, signUpAndSave, history } = this.props;

    if (users.length) {
      users.find((user) => {
        if (user.username === values.username) {
          errors.username = "Username already exist";
        }

        if (user.email === values.email) {
          errors.email = "Email already exist";
        }

        return user;
      });
    }

    if (!Object.keys(errors).length) {
      signUpAndSave({
        username: values.username,
        email: values.email,
        password: values.password
      });
      actions.resetForm(this.state);

      history.push("/login");
    } else {
      return actions.setErrors(errors);
    }
  };
  render() {
    return (
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
                    handleBlur,
                    values,
                    errors,
                    touched
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <InputWrapper
                        id="validate-signup-username"
                        label="Username"
                        error={errors.username}
                      >
                        <Form.Control
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.username && touched.username}
                          isValid={touched.username && !errors.username}
                          placeholder="Type account username"
                        />
                      </InputWrapper>

                      <InputWrapper
                        id="validate-signup-email"
                        label="Email"
                        error={errors.email}
                      >
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.email && touched.email}
                          isValid={touched.email && !errors.email}
                          placeholder="Type email"
                        />
                      </InputWrapper>

                      <InputWrapper
                        id="validate-signup-password"
                        label="Password"
                        error={errors.password}
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password && touched.password}
                          isValid={touched.password && !errors.password}
                          placeholder="Type password"
                        />
                      </InputWrapper>

                      <InputWrapper
                        id="validate-signup-confirm-password"
                        label="Confirm password"
                        error={errors.confirmPassword}
                      >
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            !!errors.confirmPassword && touched.confirmPassword
                          }
                          isValid={
                            touched.confirmPassword && !errors.confirmPassword
                          }
                          placeholder="Confirm password"
                        />
                      </InputWrapper>

                      <Button type="submit" variant="info">
                        Sign Up <FontAwesomeIcon icon={faPaperPlane} />
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
  { signUpAndSave }
)(SignUpForm);
