import { Col, Row, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import useStore from "../hooks/useStore";
function Delete(props) {
  const id = props.id;
  const { handleClose, show, handleUpdate } = props;
  const store = useStore();
  const userFieldStore = store.userFieldStore;
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>DeleteField</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          CANCEL
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            userFieldStore
              .delete(store.userId, id, store.access)
              .then(() => handleUpdate());
            handleClose();
          }}
        >
          DELETE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(Delete);
