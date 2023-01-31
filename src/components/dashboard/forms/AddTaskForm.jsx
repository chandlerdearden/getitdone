import React from "react";
import { Form, ButtonGroup, Button } from "react-bootstrap";
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

  const submitHandler = (e) => {
    e.preventDefault();
    let user = localStorage.getItem("userId");
    assignedUsers.forEach((assUser) => {
      if (taskOrProject === "Task") {
        let newTask = {
          title,
          desc,
          start,
          end,
          colorEvento: color,
          user_id: assUser.value,
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
          colorEvento: color,
          user_id: assUser.value,
        };
        axios.post("/projects", newProject).then(console.log("added Project"));
        console.log(newProject);
        setShow(false);
      }
    });
  };

  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button onClick={() => setTaskOrProject("Project")} varient="secondary">
          Project
        </Button>
        <Button onClick={() => setTaskOrProject("Task")} varient="secondary">
          Task
        </Button>
      </ButtonGroup>
      <h1>Add {taskOrProject}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group
          onChange={(e) => setTitle(e.target.value)}
          controlId="title"
        >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group
          onChange={(e) => setDesc(e.target.value)}
          controlId="description"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" />
        </Form.Group>
        <Form.Group
          onChange={(e) => setStart(e.target.value)}
          controlId="startDate"
        >
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>
        <Form.Group
          onChange={(e) => setEnd(e.target.value)}
          controlId="endDate"
        >
          <Form.Label>End Date</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>
        <Form.Group
          onChange={(e) => setColor(e.target.value)}
          controlId="color"
        >
          <Form.Label>Color</Form.Label>
          <Form.Control type="color" />
        </Form.Group>
        Assign Users?
        <Select
          onChange={(selectedValues) => setAssignedUsers(selectedValues)}
          isClearable={isClearable}
          isMulti
          name="users"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTaskForm;
