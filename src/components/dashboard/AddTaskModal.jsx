import { Modal, Button } from "react-bootstrap";
import React from 'react'
import { useState, useEffect } from "react";
import './popper.css'
import ReactDom from "react-dom";
import AddTaskForm from "./forms/AddTaskForm";
import axios from "axios";

const AddTaskModal = ({setShow, show}) => {
  const [usernames, setUsernames] = useState([])

const getUsernames = async () => {
  const user = localStorage.getItem('userId')
   await axios.get(`/allusers/${user}`)
   .then(({data}) => {
     setUsernames(data)
     
   }
   )
}

  useEffect(() => {
    getUsernames()
  }, []
  )
  return ReactDom.createPortal(
    <div id="modal_wrapper">
    <Modal id="modal_container" show={show}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <AddTaskForm usernames={usernames} setShow={setShow}/>  
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
