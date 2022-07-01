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
import { useState } from "react";
import AddForm from "./addForm";

function Add(props) {
  const initialValues = props.initialValues;
  const setInitialValues = () => {
    if (!initialValues) {
      return {
        label: "",
        type: "",
        options: "",
        required: false,
        active: false,
      };
    }
    const options = initialValues.options.reduce(
      (acc, curr) => acc + curr + "\n",
      ""
    );
    console.log("initialValues>>" + initialValues);
    return {
      label: initialValues.label,
      type: initialValues.type,
      options: options,
      required: initialValues.required, //? ["required"] : [],
      active: initialValues.active, //? ["active"] : [],
    };
  };
  const handleUpdate = props.handleUpdate;
  const store = useStore();
  const userFieldStore = store.userFieldStore;
  const show = props.show;
  const handleClose = props.handleClose;
  const update = props.update;

  const submit = (values) => {
    console.log(values);
    const options =
      values.options &&
      (values.type === "CHECKBOX" ||
        values.type === "COMBOBOX" ||
        values.type === "RADIO_BUTTON")
        ? values.options.split("\n")
        : [];
    const field = {
      label: values.label,
      type: values.type,
      options: options,
      required: values.required,
      active: values.active,
    };

    if (!update)
      userFieldStore
        .post(store.userId, field, store.access)
        .then(() => handleUpdate());
    else
      userFieldStore
        .put(store.userId, userFieldStore.activeFieldId, field, store.access)
        .then(() => handleUpdate(true));
    handleClose();
  };
  const schema = yup.object().shape({
    label: yup.string().required(),
    type: yup.string().required(),
    options: yup
      .string()
      .when("type", {
        is: "RADIO_BUTTON",
        then: yup.string().required(),
      })
      .when("type", {
        is: "CHECKBOX",
        then: yup.string().required(),
      })
      .when("type", {
        is: "COMBOBOX",
        then: yup.string().required(),
      }),
  });
  return (
    <Formik
      enableReinitialize
      render={(props) => {
        return (
          <AddForm
            {...props}
            show={show}
            handleClose={handleClose}
            update={update}
          ></AddForm>
        );
      }}
      initialValues={setInitialValues()}
      validationSchema={schema}
      onSubmit={submit}
    />
  );
}

export default observer(Add);
