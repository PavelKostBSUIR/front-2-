import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
function AddForm(props) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleClose,
    handleReset,
    initialValues,
    show,
    update,
  } = props;
  useEffect(() => {
    // if (show) handleReset();
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{update ? <>Edit Field</> : <>Add Field</>}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Label<span class="text-danger">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="label"
                  value={values.label}
                  onChange={handleChange}
                  isValid={touched.label && !errors.label}
                  isInvalid={!!errors.label}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.label}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Type<span class="text-danger">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  isValid={touched.type && !errors.type}
                  isInvalid={!!errors.type}
                >
                  <option></option>
                  <option value="SINGLE_LINE_TEXT">Single text</option>
                  <option value="MULTILINE_TEXT">Multiline text</option>
                  <option value="RADIO_BUTTON">Radio button</option>
                  <option value="CHECKBOX">Checkbox</option>
                  <option value="DATE">Date</option>
                  <option value="COMBOBOX">Combobox</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Row>
          {values.type === "RADIO_BUTTON" ||
          values.type === "CHECKBOX" ||
          values.type === "COMBOBOX" ? (
            <Row className="mb-3">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Options<span class="text-danger">*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="options"
                    value={values.options}
                    onChange={handleChange}
                    isValid={touched.options && !errors.options}
                    isInvalid={!!errors.options}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.options}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Row>
          ) : (
            <></>
          )}

          <Row className="mb-3 d-flex justify-content-center">
            <Form.Group as={Col} md="auto">
              <Form.Check
                checked={values.required}
                type="checkbox"
                label="Required"
                name="required"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="auto">
              <Form.Check
                checked={values.active}
                type="checkbox"
                label="Is Active"
                name="active"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          CANCEL
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          SAVE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(AddForm);
