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
import UserForm from "./userForm";
import { useEffect } from "react";
import UserPasswordForm from "./userPasswordForm";

function UserPassword() {
  const navigate = useNavigate();
  const store = useStore();
  const userStore = store.userStore;
  const submit = (values, { setFieldError }) => {
    console.log(values);
    delete values.confirmPassword;
    userStore.putPassword(store.userId, values, store.access, (error) => {
      if (error) {
        setFieldError("oldPassword", "Password is incorrect");
      } else {
        navigate("/users/" + store.userId + "/fields");
      }
    });
  };
  const schema = yup.object().shape({
    oldPassword: yup.string().min(6).required(),
    newPassword: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("newPassword"), null], "Passwords must be equal"),
  });
  return (
    <Container
      className="justify-content-md-center bg-white"
      style={{ width: "25%" }}
    >
      <Row className=" mt-5 mx-3 py-5">
        <Col className="justify-content-md-center align-items-center">
          <Formik
            render={(props) => <UserPasswordForm {...props} />}
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={schema}
            onSubmit={submit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(UserPassword);
