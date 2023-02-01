import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsFilter, BsPlusSquare } from "react-icons/bs";

const SideBar = ({ addTaskModal }) => {
  return (
    <>
      <Container fluid className="h-100 m-0">
        <Row>
          <Col className="m-2">
            <BsFilter /> Filter
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Check className="m-3" type="checkbox" label="Projects" />
            <Form.Check className="m-3" type="checkbox" label="Tasks" />
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
