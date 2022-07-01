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
import Condition from "yup/lib/Condition";
import RegistrationForm from "./registrationForm";

function Registration() {
  const navigate = useNavigate();
  const store = useStore();
  const userStore = store.userStore;
  const submit = (values, { setFieldError }) => {
    console.log(values);
    delete values.confirmPassword;
    userStore.post(values, (error) => {
      if (error) {
        setFieldError("login", "Email can be used");
      } else {
        navigate("/auth/login");
      }
    });
  };
  const schema = yup.object().shape({
    login: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must be equal"),
    name: yup.string(),
    surname: yup.string(),
    phoneNumber: yup.string(),
  });
  return (
    <Container
      className="justify-content-md-center bg-white"
      style={{ width: "25%" }}
    >
      <Row className=" mt-5 mx-3 py-5">
        <Col className="justify-content-md-center align-items-center">
          <Formik
            render={(props) => (
              <RegistrationForm
                {...props}
                navigateToLogin={() => navigate("/auth/login")}
              ></RegistrationForm>
            )}
            initialValues={{
              login: "",
              password: "",
              confirmPassword: "",
              name: "",
              surname: "",
              phoneNumber: "",
            }}
            validationSchema={schema}
            onSubmit={submit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Registration);
