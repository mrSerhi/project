import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(2, "name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email is required")
});

const initialValues = { username: "", email: "" };

const SignInForm = () => {
  return (
    <Container>
      <Row>
        <Col sm={{ span: 6, offset: 3 }} className="mt-5">
          <Card>
            <Card.Body>
              <h3 className="display-4 text-center">Sign In</h3>

              <Formik
                initialValues={initialValues}
                validationSchema={SignInSchema}
                validate={(values) => {
                  const userData = JSON.parse(localStorage.getItem("userdata"));
                  const errors = {};

                  userData.forEach((data) => {
                    if (data.username !== values.username) {
                      errors.username = "User is not found";
                    }

                    if (values.username === "") {
                      errors.username = "User field is required";
                    }

                    if (data.email !== values.email) {
                      errors.email = "Email is not found";
                    }

                    if (values.email === "") {
                      errors.email = "Email field is requred";
                    }
                  });

                  return errors;
                }}
                onSubmit={(values, actions) => {
                  // const userData = JSON.parse(localStorage.getItem("userdata"));

                  // userData.forEach((data) => {
                  //   if (data.username !== values.username) {
                  //     actions.setSubmitting(false);
                  //     actions.setFieldError("username", "User is not found");
                  //   }

                  //   if (data.email !== values.email) {
                  //     actions.setSubmitting(false);
                  //     actions.setFieldError("email", "Email is not found");
                  //   }
                  // });

                  alert("Logged successfuly");
                  actions.resetForm();
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  isSubmitting
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="validationUserName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username}
                        placeholder="Enter name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback>Accepted!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationUserEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                        placeholder="Enter email"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback>Accepted!</Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="info"
                      // disabled={isSubmitting}
                    >
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
};

export default SignInForm;
