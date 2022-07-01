import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function UserForm(props) {
  const { values, errors, touched, handleSubmit, handleChange } = props;
  return (
    <Form>
      <Row className="mb-4">
        <h4>Edit Profile</h4>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label column sm={3}>
            First Name
          </Form.Label>
          <Form.Control
            type="text"
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
          <Form.Label column sm={3}>
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
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
          <Form.Label column sm={3}>
            Email<span class="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="email"
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
          <Form.Label column sm={4}>
            Phone Number
          </Form.Label>
          <Form.Control
            type="text"
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
        <Col>
          <Button type="submit" onClick={handleSubmit}>
            SAVE
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default observer(UserForm);
