import React from "react";
import { Form, ButtonGroup, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";

const AddTaskForm = ({ setShow, usernames }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState(Date);
  const [end, setEnd] = useState(Date);
  const [color, setColor] = useState("");
  const [taskOrProject, setTaskOrProject] = useState("Project");
  const [isClearable, setIsClearable] = useState(true);
  const [assignedUsers, setAssignedUsers] = useState();

  const options = usernames.map((user) => {
    return { value: user.id, label: user.username };
  });

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "orange", label: "Orange" },
    { value: "purple", label: "Purple" },
  ];

  const mappedColorOptions = colorOptions.map((color) => {
    return color;
  });

  const submitHandler = (e) => {
    e.preventDefault();
    let user = localStorage.getItem("userId");
    assignedUsers.forEach((assUser) => {
      if (taskOrProject === "Task") {
        let newTask = {
          title: "Task: " + title,
          desc,
          start,
          end,
          colorEvento: color.value,
          user_id: assUser.value,
          creator_id: user,
        };
        axios.post("/tasks", newTask).then();
        console.log(newTask);
        setShow(false);
      }
      if (taskOrProject === "Project") {
        let newProject = {
          title: "Project: " + title,
          desc,
          start,
          end,
          colorEvento: color.value,
          user_id: assUser.value,
          creator_id: user,
        };
        axios.post("/projects", newProject).then(console.log("added Project"));
        console.log(newProject);
        setShow(false);
      }
    });
  };

  return (
    <>
      <h1 className="mx-3">Add {taskOrProject}</h1>
      <ButtonGroup className="mx-3" aria-label="Basic example">
        <Button
          className="rounded-0"
          onClick={() => setTaskOrProject("Project")}
          varient="secondary"
        >
          Project
        </Button>
        <Button
          className="rounded-0"
          onClick={() => setTaskOrProject("Task")}
          varient="secondary"
        >
          Task
        </Button>
      </ButtonGroup>
      <Form className="m-3" onSubmit={submitHandler}>
        <Form.Group className="py-2">
          <Form.Label className="m-0">Assign Users</Form.Label>
          <Select
            onChange={(selectedValues) => setAssignedUsers(selectedValues)}
            isClearable={isClearable}
            isMulti
            name="users"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Form.Group>
        <Form.Group
        className="py-2"
          onChange={(e) => setTitle(e.target.value)}
          controlId="title"
        >
          <Form.Label className="m-0">Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>

        <Form.Group className="py-2">
          <Form.Label className="m-0">Color</Form.Label>
          <Select
            onChange={(selected) => setColor(selected)}
            name="color"
            isClearable={isClearable}
            options={mappedColorOptions}
          />
        </Form.Group>

        <Row className="d-flex py-2">
          <Col className="d-flex">
            <Form.Group
              onChange={(e) => setStart(e.target.value)}
              controlId="startDate"
            >
              <Form.Label className="m-0">Start Date</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Col>
          <Col className="d-flex">
            <Form.Group
              onChange={(e) => setEnd(e.target.value)}
              controlId="endDate"
            >
              <Form.Label className="m-0">End Date</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group
          className="h-25 py-2"
          onChange={(e) => setDesc(e.target.value)}
          controlId="description"
        >
          <Form.Label className="m-0">Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter Description"
          />
        </Form.Group>

        <Button className="my-2 rounded-0" variant="primary" type="submit">
          Submit
        </Button>
        <Button className=" mx-2 rounded-0" onClick={() => setShow(false)}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default AddTaskForm;
