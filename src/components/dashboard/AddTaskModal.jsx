import { Modal, Button } from "react-bootstrap";
import React from 'react'
import { useState } from "react";
import './popper.css'
import ReactDom from "react-dom";
import AddTaskForm from "./forms/AddTaskForm";

const AddTaskModal = ({setShow, show}) => {

  return ReactDom.createPortal(
    <div id="modal_wrapper">
    <Modal id="modal_container" show={show}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <AddTaskForm setShow={setShow}/>  
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>,
    document.getElementById("addtask-modal")
  )
}

export default AddTaskModal
