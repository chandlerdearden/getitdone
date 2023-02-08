import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsFilter, BsPlusSquare } from "react-icons/bs";
import Profile from "../profile/Profile";

const SideBar = ({
  byTasks,
  byProjects,
  addTaskModal,
  filterByTasks,
  filterByProjects,
}) => {
  return (
    <>
      <Container fluid className="h-100 m-0 border p-3 shadow">
        <Row className="border-0">
          <Profile />
        </Row>
        <br></br>
        <br></br>

        <Row>
          <Col className="m-2">
            <BsFilter /> Filter
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Check
              onClick={() => filterByProjects(!byProjects)}
              className="m-3"
              type="checkbox"
              label="Projects"
            />
            <Form.Check
              onClick={() => filterByTasks(!byTasks)}
              className="m-3"
              type="checkbox"
              label="Tasks"
            />
          </Form>
        </Row>
        <Row>
          <Button className="rounded-0" onClick={addTaskModal}>
            Add Task/Project
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default SideBar;
