import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function UserForm(props) {
  const { values, errors, touched, handleSubmit, handleChange } = props;
  return (
    <Form>
      <Row className="mb-4">
        <h4>Change Password</h4>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label column sm={5}>
            Current Password<span class="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleChange}
            isValid={touched.oldPassword && !errors.oldPassword}
            isInvalid={!!errors.oldPassword}
          />

          <Form.Control.Feedback type="invalid">
            {errors.oldPassword}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label column sm={5}>
            New Password<span class="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            isValid={touched.newPassword && !errors.newPassword}
            isInvalid={!!errors.newPassword}
          />

          <Form.Control.Feedback type="invalid">
            {errors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label column sm={5}>
            Confirm Password<span class="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="password"
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
        <Col>
          <Button type="submit" onClick={handleSubmit}>
            CHANGE
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default observer(UserForm);
