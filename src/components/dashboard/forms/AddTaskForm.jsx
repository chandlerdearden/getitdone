import React from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import e from "cors";
import axios from "axios";
const AddTaskForm = ({setShow}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState(Date);
  const [end, setEnd] = useState(Date);
  const [color, setColor] = useState('');

  const submitHandler = (e) => {
    e.preventDefault()
    let newTask = {
        title,
        desc,
        start,
        end,
        colorEvento: color,
        user_id: localStorage.getItem('userId')
    }
    axios.post('/tasks', newTask)
    .then()
    console.log(newTask)
    setShow(false)
  }

  return (
    <div>
      <h1>Add New Task</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group onChange={(e) => setTitle(e.target.value)} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>

        <Form.Group onChange={(e) => setDesc(e.target.value)} controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" />
        </Form.Group>

        <Form.Group onChange={(e) => setStart(e.target.value)} controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>

        <Form.Group onChange={(e) => setEnd(e.target.value)} controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>

        <Form.Group onChange={(e) => setColor(e.target.value)} controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control type="color" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTaskForm;
