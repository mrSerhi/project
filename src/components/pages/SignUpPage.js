import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../ui/FormInput";
import { Redirect } from "react-router-dom";
import { currentUserAuth } from "../../utils/auth";

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
    addNewUser: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentUser: PropTypes.object.isRequired
  };

  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleSubmitForm = (values, actions) => {
    const errors = {};
    const { users, addNewUser, history } = this.props;

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
      addNewUser({
        id: uuid(),
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
    // if user is auth than redirect on root path
    if (currentUserAuth(this.props.currentUser)) return <Redirect to="/" />;
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
                    values,
                    errors,
                    touched
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <FormInput
                        id="validate-signup-username"
                        label="Username"
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        placeholder="Type account username"
                      />

                      <FormInput
                        id="validate-signup-email"
                        label="Email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        placeholder="Type account email"
                      />

                      <FormInput
                        id="validate-signup-password"
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        placeholder="Type account password"
                      />

                      <FormInput
                        id="validate-signup-confirm-password"
                        label="Confirm password"
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        placeholder="Confirm password"
                      />

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

export default SignUpForm;
