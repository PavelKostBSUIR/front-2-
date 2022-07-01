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

function Login() {
  const navigate = useNavigate();
  const store = useStore();
  const submit = (values, { setFieldError }) => {
    console.log("remembe3434r>>" + values.remember);
    store.login(values, (error) => {
      if (error) {
        setFieldError("login", "Email can be incorrect");
        setFieldError("password", "Password can be incorrect");
        //  values.remember = false;
      } else {
        navigate("/users/" + store.userId + "/fields");
      }
    });
  };
  const schema = yup.object().shape({
    login: yup.string().email().required(),
    password: yup.string().min(6).required(),
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
              <LoginForm
                {...props}
                navigateToRegistration={() => navigate("/users")}
              ></LoginForm>
            )}
            initialValues={{
              login: "",
              password: "",
              remember: false,
            }}
            validationSchema={schema}
            onSubmit={submit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Login);
