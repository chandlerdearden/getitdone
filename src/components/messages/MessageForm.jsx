import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";

const AddmessageForm = ({ getMessages, usernames }) => {
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
  return (
    <div>
      <Select
        onChange={(selectedValues) => setAssignedUsers(selectedValues)}
        isClearable={isClearable}
        isMulti
        name="users"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <Form onSubmit={submitHandler}>
        <Form.Group
          onChange={(e) => setSubject(e.target.value)}
          controlId="subject"
        >
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>

        <Form.Group
          onChange={(e) => setContent(e.target.value)}
          controlId="description"
        >
          <Form.Label>Details</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddmessageForm;
