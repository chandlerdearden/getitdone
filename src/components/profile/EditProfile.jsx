import React from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ReactDom from "react-dom";
import CloseButton from 'react-bootstrap/CloseButton';


const EditProfile = ({ user, show,setShow }) => {
  return ReactDom.createPortal(
    <Modal show={show}>
      <Card className="d-flex border-0 p-3">
      <Modal.Header className="border-0"> <CloseButton onClick={()=> setShow(!show)}/></Modal.Header>
        <h1>Edit Profile</h1>
        <Form onSubmit={()=> setShow(!show)}>
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
        <Col className="justify-content-end my-3">
          <Button className="rounded-0 m-0" type="submit">
            Save Changes
          </Button>
          <Button onClick={()=> setShow(false)} className="rounded-0 mx-2">Cancel</Button>
        </Col>
      </Card>
    </Modal>,
    document.getElementById("editProfile-modal")
  );
};

export default EditProfile;
