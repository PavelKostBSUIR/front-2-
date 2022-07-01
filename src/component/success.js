import { Col, Row, Button, Form, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function Success(props) {
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
    <Container
      className="justify-content-md-center bg-white mt-5 py-4"
      style={{ width: "25%" }}
    >
      <Row className="mb-3 d-flex justify-content-center">
        <Col md="auto">
          <h2>Thank you!</h2>
        </Col>
      </Row>
      <Row className="mb-3 d-flex justify-content-center">
        <Col md="auto">
          <h5>Your response was saved.</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Success);
