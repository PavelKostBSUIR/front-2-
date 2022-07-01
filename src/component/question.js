import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import * as yup from "yup";
import MyForm from "./questionForm";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import { useEffect } from "react";

function Question() {
  const { id } = useParams();
  const store = useStore();
  const navigate = useNavigate();
  const questionStore = store.questionStore;
  const answerStore = store.answerStore;
  useEffect(() => questionStore.get(id), []);
  const submit = (values) => {
    question.fields.map((field) => {
      if (field.type === "RADIO_BUTTON" || "CHECKBOX") {
        if (!values[field.id + ""]) {
          values[field.id + ""] = [];
        }
      }
      return field;
    });
    const fieldAnswers = question.fields.map((field) => {
      const value = Array.isArray(values[field.id + ""])
        ? values[field.id + ""]
        : [values[field.id + ""]];
      return { fieldId: field.id, options: value };
    });
    const answer = {
      askerId: id,
      fieldAnswers: fieldAnswers,
    };
    answerStore.post(answer);
    navigate("/success");
  };
  const question = questionStore.question;
  const schema = yup
    .object()
    .shape(
      question
        ? question.fields.reduce(
            (acc, curr) =>
              curr.required && curr.type !== "CHECKBOX"
                ? ((acc[curr.id + ""] = yup.string().required()), acc)
                : acc,
            {}
          )
        : {}
    );

  return question ? (
    <Container className="bg-white" style={{ width: "30%" }}>
      <Row className="justify-content-md-center align-items-center mt-5 py-5">
        <Col xs="10">
          <Formik
            render={(props) => (
              <MyForm {...props} fields={question.fields}></MyForm>
            )}
            initialValues={question.fields.reduce(
              (acc, curr) => ((acc[curr.id + ""] = ""), acc),
              {}
            )}
            validationSchema={schema}
            onSubmit={submit}
          />
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
}

export default observer(Question);
