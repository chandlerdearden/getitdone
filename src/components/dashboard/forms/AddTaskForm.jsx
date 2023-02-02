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

  const colorOptions = [
    {value: "red", label: "Red"},
    {value: "green", label: "Green"},
    {value: "blue", label: "Blue"},
    {value: "orange", label: "Orange"},
    {value: "purple", label: "Purple"},
  ]

  const mappedColorOptions = colorOptions.map((color) => {
    return color
  }
  )

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
          creator_id: user
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
          creator_id: user
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
        

        <Form.Group>
        <Form.Label>Color</Form.Label>
          <Select
          onChange={(selected)=> setColor(selected)}
          name="color"
          isClearable={isClearable}
          options={mappedColorOptions}/>
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
          <br/>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTaskForm;
