import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../ui/FormInput";
import { connect } from "react-redux";

const restoreEmailSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name is required")
});

class RestoreEmailForm extends Component {
  state = {
    username: "",
    sendVerification: false
  };

  handleSubmitForm = (values, actions) => {
    const user = this.props.users.find(
      (user) => user.username === values.username
    );
    const errors = {};

    if (user === undefined) {
      errors.username = "No user with this name found";
    }

    if (!Object.keys(errors).length) {
      this.setState({ sendVerification: true });
      actions.resetForm(this.state);
    } else {
      this.setState({ sendVerification: false });

      return actions.setErrors(errors);
    }
  };

  render() {
    const { sendVerification } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="warning" className="mb-2">
              <p className="text-center">
                Enter your currently{" "}
                <span className="text-danger">Username</span> and we will send
                recovery instructions to your email
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
                    Send
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>

        {sendVerification && (
          <Alert variant="success" className="mt-3">
            <p className="text-center">
              Instructions sent successfully. Check your email...
            </p>
          </Alert>
        )}
      </Container>
    );
  }
}

export default connect((state) => ({ users: state.auth.users }))(
  RestoreEmailForm
);
