import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import ReactDom from "react-dom";
import CloseButton from 'react-bootstrap/CloseButton';




const AddmessageForm = ({ getMessages, usernames, show, setShow }) => {
  const [creator_id, setCreatorId] = useState(localStorage.getItem("userId"));
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [assignedUsers, setAssignedUsers] = useState();
  const [isClearable, setIsClearable] = useState(true);


  const options = usernames.map((user) => {
    return { value: user.id, label: user.username };
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(assignedUsers);
    assignedUsers.forEach((user) => {
      const message = {
        creator_id: +creator_id,
        userId: +user.value,
        content,
        subject,
      };
      axios
        .post("/messages", message)
        .then((res) => console.log("Message was added"));
      getMessages();
    });
  };
  return ReactDom.createPortal(
    <Modal show={show} className="">
      <Modal.Header className="border-0"><CloseButton onClick={()=> setShow(false)}/></Modal.Header>
      <Modal.Body>
        <h1>New Message</h1>
      <div className="py-2">
        <label>To:</label>
      <Select
        onChange={(selectedValues) => setAssignedUsers(selectedValues)}
        isClearable={isClearable}
        isMulti
        name="users"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group
        className="py-2"
          onChange={(e) => setSubject(e.target.value)}
          controlId="subject"
        >
          <Form.Label className="m-0">Subject</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>

        <Form.Group
        className="py-2"
          onChange={(e) => setContent(e.target.value)}
          controlId="description"
        >
          <Form.Label className="m-0">Details</Form.Label>
          <Form.Control as='textarea' type="text" placeholder="Enter Description" />
        </Form.Group>

        <Button className="rounded-0 my-1" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Modal.Body>
    </Modal>,
   document.getElementById("addmessage-modal")
  )
};

export default AddmessageForm;
