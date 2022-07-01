import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function RegistrationForm(props) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    navigateToLogin,
  } = props;
  const fields = props.fields;
  return (
    <Form>
      <Row className="mb-3">
        <h2 className="d-flex justify-content-center">
          LOGO<span className="font-weight-bold text-primary">TYPE</span>
        </h2>
      </Row>
      <Row className="mb-4">
        <h5 className="d-flex justify-content-center">Sign up</h5>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="email"
            placeholder="Email*"
            name="login"
            value={values.login}
            onChange={handleChange}
            isValid={touched.login && !errors.login}
            isInvalid={!!errors.login}
          />

          <Form.Control.Feedback type="invalid">
            {errors.login}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="password"
            placeholder="Password*"
            name="password"
            value={values.password}
            onChange={handleChange}
            isValid={touched.password && !errors.password}
            isInvalid={!!errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="password"
            placeholder="Confirm Password*"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            isValid={touched.confirmPassword && !errors.confirmPassword}
            isInvalid={!!errors.confirmPassword}
          />

          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            isValid={touched.name && !errors.name}
            isInvalid={!!errors.name}
          />

          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="surname"
            value={values.surname}
            onChange={handleChange}
            isValid={touched.surname && !errors.surname}
            isInvalid={!!errors.surname}
          />

          <Form.Control.Feedback type="invalid">
            {errors.surname}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="PhoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            isValid={touched.phoneNumber && !errors.phoneNumber}
            isInvalid={!!errors.phoneNumber}
          />

          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Col class="d-flex justify-content-center">
          <Button
            style={{ width: "100%" }}
            type="submit"
            onClick={handleSubmit}
          >
            SIGN UP
          </Button>
        </Col>
      </Row>
      <Row className="mb-3 d-flex justify-content-center">
        <Col md="auto">
          <p>Already have account?</p>
        </Col>
        <Col md="auto">
          <p class="link-primary" onClick={navigateToLogin}>
            Log in
          </p>
        </Col>
      </Row>
    </Form>
  );
}

export default observer(RegistrationForm);
