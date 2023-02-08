import { Modal, Button } from "react-bootstrap";
import React from 'react'
import { useState, useEffect } from "react";
import './popper.css'
import ReactDom from "react-dom";
import AddTaskForm from "./forms/AddTaskForm";
import axios from "axios";
import CloseButton from 'react-bootstrap/CloseButton';

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
    <Modal className=" modal-lg"  show={show}>
      <Modal.Header className="border-0"><CloseButton onClick={() => setShow(false)}/></Modal.Header>
      <Modal.Body className="p-1">
        <AddTaskForm usernames={usernames} setShow={setShow}/>  
      </Modal.Body>
      
    </Modal>
    ,
    document.getElementById("addtask-modal")
  )
}

export default AddTaskModal
