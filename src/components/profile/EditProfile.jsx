import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const EditProfile = ({ user }) => {
  return (
    <Card className="d-flex border-0">
      <h1 className="border-bottom">Edit Profile</h1>
        <Form>
          <Row>
            <Form.Group className="m-0">
              <Form.Label className="m-0">Username</Form.Label>
              <Form.Control type="text" defaultValue={user.username} />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group className="m-0">
                <Form.Label className="m-0">Last Name</Form.Label>
                <Form.Control type="text" defaultValue={user.firstname} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="m-0">
                <Form.Label className="m-0">First Name</Form.Label>
                <Form.Control type="text" defaultValue={user.lastname} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="m-0">
            <Form.Label className="m-0">Email:</Form.Label>
            <Form.Control type="text" defaultValue={user.email} />
          </Form.Group>
        </Form>
      <Col className="justify-content-end">
        <Button className="rounded-0 m-1" type="submit">Save Changes</Button>
      </Col>
    </Card>
  );
};

export default EditProfile;
