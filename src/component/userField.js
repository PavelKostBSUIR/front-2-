import Table from "react-bootstrap/Table";
import { FaThumbsUp } from "react-icons/fa";
import { BsPencilSquare, BsTrash, BsPlusLg } from "react-icons/bs";
import { Button, Container, Row, Col } from "react-bootstrap";
import Add from "./add";
import { useInsertionEffect, useState } from "react";
import useStore from "../hooks/useStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Pagin from "./pagination";
import Delete from "./delete";
import { useParams } from "react-router-dom";
function UserField() {
  const [show, setShow] = useState(false);
  const [size, setSize] = useState("10");
  const handleClose = () => {
    setShow(false);
  };
  const handleUpdate = (leave) => {
    if (leave) {
      console.log("leave");
      userFieldStore.getPage(
        store.userId,
        userFieldStore.fieldPage.page,
        size,
        store.access
      );
    } else {
      console.log("not leave");
      userFieldStore.getPage(store.userId, 0, size, store.access);
    }
  };
  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const store = useStore();
  const userFieldStore = store.userFieldStore;
  const fieldPage = userFieldStore.fieldPage;
  const fields = userFieldStore.fieldPage
    ? userFieldStore.fieldPage.fields
    : undefined;
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowEdit = (id) => {
    userFieldStore.setActiveFieldId(id);
    setShowEdit(true);
  };
  const handleShowDelete = (id) => {
    userFieldStore.setActiveFieldId(id);
    setShowDelete(true);
  };
  useEffect(
    () => userFieldStore.getPage(store.userId, 0, size, store.access),
    []
  );

  return userFieldStore.fieldPage ? (
    <Container
      className="bg-white justify-content-md-center align-items-center mt-5 py-3"
      style={{ width: "80%" }}
    >
      <Add
        show={show}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      ></Add>
      <Add
        handleUpdate={handleUpdate}
        show={showEdit}
        handleClose={handleCloseEdit}
        initialValues={userFieldStore.activeField}
        update={true}
      />
      <Delete
        handleUpdate={handleUpdate}
        show={showDelete}
        handleClose={handleCloseDelete}
        id={userFieldStore.activeFieldId}
      ></Delete>
      <Row className="d-flex justify-content-between">
        <Col md="auto">
          <h2>Fields</h2>
        </Col>
        <Col md="auto">
          <Button onClick={handleShow}>
            <Row>
              <Col md="auto" className="d-flex align-items-center">
                <BsPlusLg></BsPlusLg>{" "}
              </Col>
              <Col md="auto">ADD FIELD</Col>
            </Row>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped hover>
            <thead>
              <tr>
                <th>Label</th>
                <th>Type</th>
                <th>Required</th>
                <th>Is Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => {
                return (
                  <tr>
                    <td>{field.label}</td>
                    <td>{field.type}</td>
                    <td>{field.required + ""}</td>
                    <td>{field.active + ""}</td>
                    <td style={{ width: "8%" }}>
                      <Button
                        variant="none"
                        onClick={() => handleShowEdit(field.id)}
                      >
                        <BsPencilSquare></BsPencilSquare>
                      </Button>
                      <Button
                        variant="none"
                        onClick={() => handleShowDelete(field.id)}
                      >
                        <BsTrash></BsTrash>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col md="auto">1-2 of 2</Col>
        <Col md="auto">
          <Pagin
            page={fieldPage.page}
            totalPages={fieldPage.totalPages}
            max={5}
            getPage={(page) =>
              userFieldStore.getPage(store.userId, page, size, store.access)
            }
          ></Pagin>
        </Col>
        <Col md="auto">
          <select
            class="form-select"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              userFieldStore.getPage(
                store.userId,
                0,
                e.target.value,
                store.access
              );
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option vaslue="15">15</option>
            <option value="20">20</option>
          </select>
        </Col>
      </Row>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}

export default observer(UserField);
