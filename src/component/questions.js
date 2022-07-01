import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import * as yup from "yup";
import MyForm from "./questionForm";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import LoginForm from "./loginForm";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Questions() {
  const navigate = useNavigate();
  const store = useStore();
  const questionStore = store.questionStore;
  useEffect(() => {
    questionStore.getAll();
  }, []);

  const navigateToQuestion = (id) => {
    navigate(id + "");
  };
  return questionStore.questionIds ? (
    <Container
      className="justify-content-md-center bg-white"
      style={{ width: "25%" }}
    >
      <Row className=" mt-5 mx-3 py-5">
        <Col className="justify-content-md-center align-items-center">
          {questionStore.questionIds.map((questionId) => {
            return (
              <Row className="mb-3">
                <Col class="d-flex justify-content-center">
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => navigateToQuestion(questionId)}
                  >
                    Question {questionId}
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
}

export default observer(Questions);
