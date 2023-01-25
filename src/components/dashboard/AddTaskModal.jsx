import React from "react";
import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";

const AddTaskModal = ({ show, setShow }) => {
  return (
    ReactDom.createPortal(
      <div>
        <Modal show={show}>
          <Modal.Header>This is where the headers goes</Modal.Header>
          <Modal.Body>I can put some stuff here</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShow(false)}>Close</Button>
            <Button>add Task</Button>
          </Modal.Footer>
        </Modal>
      </div>
    ),
    document.getElementById("task-modal")
  );
};

export default AddTaskModal;
