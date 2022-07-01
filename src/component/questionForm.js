import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function QuestionForm(props) {
  const { values, errors, touched, handleSubmit, handleChange } = props;
  const fields = props.fields;
  const resolveType = (type) => {
    switch (type) {
      case "SINGLE_LINE_TEXT":
        return {
          type: "text",
        };
      case "DATE":
        return {
          type: "date",
        };
      case "PASSWORD":
        return {
          type: "password",
        };
      case "EMAIL":
        return {
          type: "email",
        };
      case "RADIO_BUTTON":
        return {
          type: "radio",
        };
      case "CHECKBOX":
        return {
          type: "checkbox",
        };
      default:
        return undefined;
    }
  };
  return (
    <Form>
      {fields.map((field) => {
        switch (field.type) {
          case "SINGLE_LINE_TEXT":
          case "DATE":
          case "PASSWORD":
          case "EMAIL":
            return (
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    {field.label}
                    {field.required ? <span class="text-danger">*</span> : ""}
                  </Form.Label>
                  <Form.Control
                    {...resolveType(field.type)}
                    name={field.id + ""}
                    placeholder={field.label}
                    value={values[field.id + ""]}
                    onChange={handleChange}
                    isValid={touched[field.id + ""] && !errors[field.id + ""]}
                    isInvalid={!!errors[field.id + ""]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[field.id + ""]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            );
          case "MULTILINE_TEXT":
            return (
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    {field.label}
                    {field.required ? <span class="text-danger">*</span> : ""}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name={field.id + ""}
                    placeholder={field.label}
                    value={values[field.id + ""]}
                    onChange={handleChange}
                    isValid={touched[field.id + ""] && !errors[field.id + ""]}
                    isInvalid={!!errors[field.id + ""]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[field.id + ""]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            );
          case "RADIO_BUTTON":
          case "CHECKBOX":
            return (
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    {field.label}
                    {field.required ? <span class="text-danger">*</span> : ""}
                  </Form.Label>
                  {field.options.map((option) => {
                    return (
                      <Form.Check
                        {...resolveType(field.type)}
                        name={field.id + ""}
                        label={option + ""}
                        value={option + ""}
                        onChange={handleChange}
                        isValid={
                          touched[field.id + ""] && !errors[field.id + ""]
                        }
                        isInvalid={!!errors[field.id + ""]}
                      />
                    );
                  })}
                  <Form.Control.Feedback type="invalid">
                    {errors[field.id + ""]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            );
          case "COMBOBOX":
            return (
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    {field.label}
                    {field.required ? <span class="text-danger">*</span> : ""}
                  </Form.Label>
                  <Form.Select
                    name={field.id + ""}
                    value={values[field.id + ""]}
                    onChange={handleChange}
                    isValid={touched[field.id + ""] && !errors[field.id + ""]}
                    isInvalid={!!errors[field.id + ""]}
                  >
                    <option></option>
                    {field.options.map((option) => {
                      return <option value={option}>{option}</option>;
                    })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors[field.id + ""]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            );
          default:
            return undefined;
        }
      })}
      <Button type="submit" onClick={handleSubmit}>
        SUBMIT
      </Button>
    </Form>
  );
}

export default observer(QuestionForm);
