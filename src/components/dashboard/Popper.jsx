import { Modal, Button } from "react-bootstrap";
import React from 'react'
import './popper.css'
import ReactDom from "react-dom";

const Popper = ({task, show}) => {

  return ReactDom.createPortal(
    <div id="modal_wrapper">
    <Modal id="modal_container" show={show}>
      <Modal.Header>{task.title}{task.id}</Modal.Header>
      <Modal.Body>{task.desc}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => show(false)}>Close</Button>
        <Button>Delete Task</Button>
      </Modal.Footer>
    </Modal>
    </div>,
    document.getElementById("task-modal")
  )
}

export default Popper
