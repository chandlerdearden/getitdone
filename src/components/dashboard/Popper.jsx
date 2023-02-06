import { Modal, Button } from "react-bootstrap";
import React from 'react'
import ReactDom from "react-dom";
import axios from "axios";
import CloseButton from 'react-bootstrap/CloseButton';

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
    <Modal id="modal_container" show={show}>
      <Modal.Header><CloseButton onClick={() => show(false)}/></Modal.Header>
      <Modal.Body>
        <h1>{task.title}</h1>
        <p>{task.desc}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => show(false)}>Close</Button>
        <Button onClick={() => deleteHandler(task.id, task.title)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  ,
    document.getElementById("task-modal")
  )
}

export default Popper
