import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

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
  state = { username: "", email: "", userdata: {} };

  handleSubmitForm = (values, actions) => {
    const { username, email } = values;
    const { userdata } = this.state;

    if (userdata.username !== username) {
      actions.setFieldError("username", "Name is not exist");
      return;
    }

    if (userdata.email !== email) {
      actions.setFieldError("email", "Email is not exist");
      return;
    }

    alert("Logged successfuly!");
    actions.resetForm(this.state);
  };

  componentDidMount() {
    this.setState({ userdata: JSON.parse(localStorage.getItem("userdata")) });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="mt-5">
            <Card>
              <Card.Body>
                <h3 className="display-4 text-center">Sign In</h3>

                <Formik
                  initialValues={this.state}
                  onSubmit={this.handleSubmitForm}
                  validationSchema={signInSchema}
                >
                  {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="validationUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
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
                          isInvalid={!!errors.email}
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
