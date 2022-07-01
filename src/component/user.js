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

function User() {
  const navigate = useNavigate();
  const store = useStore();
  const userStore = store.userStore;
  const user = userStore.user;
  useEffect(() => userStore.get(store.userId, store.access), []);
  const submit = (values, { setFieldError }) => {
    console.log(values);
    delete values.confirmPassword;
    userStore.put(store.userId, values, store.access, (error) => {
      if (error) {
        setFieldError("login", "Email can be used");
      } else {
        if (user.login !== values.login) {
          store.logout();
          navigate("/auth/login");
        } else {
          navigate("/users/" + store.userId + "/fields");
        }
      }
    });
  };
  const schema = yup.object().shape({
    login: yup.string().email().required(),
    name: yup.string(),
    surname: yup.string(),
    phoneNumber: yup.string(),
  });
  return user ? (
    <Container
      className="justify-content-md-center bg-white"
      style={{ width: "25%" }}
    >
      <Row className=" mt-5 mx-3 py-5">
        <Col className="justify-content-md-center align-items-center">
          <Formik
            render={(props) => <UserForm {...props} />}
            initialValues={user}
            validationSchema={schema}
            onSubmit={submit}
          />
        </Col>
      </Row>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}

export default observer(User);
