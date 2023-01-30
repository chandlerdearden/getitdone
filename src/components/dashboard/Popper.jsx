import { Modal, Button } from "react-bootstrap";
import React from 'react'
import './popper.css'
import ReactDom from "react-dom";
import axios from "axios";

const Popper = ({task, show}) => {

  const deleteHandler = (id, title) => {
    if(title.startsWith("Project:", 0)){
      axios.delete(`/projects/${id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      axios.delete(`/tasks/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }
    show(false)
  }
  
  

  return ReactDom.createPortal(
    <div id="modal_wrapper">
    <Modal id="modal_container" show={show}>
      <Modal.Header>{task.title}{task.id}</Modal.Header>
      <Modal.Body>{task.desc}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => show(false)}>Close</Button>
        <Button onClick={() => deleteHandler(task.id, task.title)}>Delete Task</Button>
      </Modal.Footer>
    </Modal>
    </div>,
    document.getElementById("task-modal")
  )
}

export default Popper
