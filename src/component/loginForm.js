import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function LoginForm(props) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    navigateToRegistration,
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
        <h5 className="d-flex justify-content-center">Log in</h5>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="email"
            placeholder="Login"
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
            placeholder="Password"
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
      <Row className="mb-3 d-flex justify-content-center">
        <Form.Group as={Col} md="auto">
          <Form.Check
            type="checkbox"
            label="Remember me"
            name="remember"
            value={values.remember}
            onChange={handleChange}
          />
        </Form.Group>
        <Col md="auto">
          <p class="link-primary">Forgot your password?</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col class="d-flex justify-content-center">
          <Button
            style={{ width: "100%" }}
            type="submit"
            onClick={handleSubmit}
          >
            LOG IN
          </Button>
        </Col>
      </Row>
      <Row className="mb-3 d-flex justify-content-center">
        <Col md="auto">
          <p>Don't have account?</p>
        </Col>
        <Col md="auto">
          <p class="link-primary" onClick={navigateToRegistration}>
            Sign Up
          </p>
        </Col>
      </Row>
    </Form>
  );
}

export default observer(LoginForm);
