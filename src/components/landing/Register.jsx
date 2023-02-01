import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const Register = ({ toggleRegister }) => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (username && password) {
      const registerUser = {
        username,
        password,
        email,
        firstName,
        lastName,
        color: "red",
      };
      console.log(registerUser);
      axios
        .post(`/register`, registerUser)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId);
        })
        .catch((err) => {
          console.log(err);
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setUsername("");
        });
    } else {
      console.log("Username & Password are required");
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formUsername">
       <Row className="justify-content-md-center">
        <Col sm="10">
        <Form.Label>
          *Username
        </Form.Label>
          <Form.Control
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
          />
        </Col>
       </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
       <Row className="justify-content-md-center">
        <Col sm="10">
        <Form.Label>
          *Password
        </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Col>
       </Row>
      </Form.Group>

      <Form.Group className="mb-3"  controlId="formEmail">
        <Row className="justify-content-md-center">
        <Col sm="10">
        <Form.Label>
          Email
        </Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFirstName">
       <Row className="justify-content-md-center">
        <Col sm="10">
        <Form.Label>
          First Name
        </Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Col>
       </Row>
      </Form.Group>

      <Form.Group className="mb-3"  controlId="formLastName">
        <Row className="justify-content-md-center">
        <Col sm="10">
        <Form.Label>
          Last Name
        </Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Col className="text-center">
        <Button className="rounded-0" variant="primary" type="submit">
          Register
        </Button>
        </Col>
      </Form.Group>

      <div className="mt-3">
        <p className="text-center">*required</p>
        <p className="mb-0  text-center">
          Already have an account?{" "}
          <a
            onClick={() => {
              toggleRegister();
            }}
            className="text-primary fw-bold"
            style={{cursor: 'pointer'}}
          >
            Log In
          </a>
        </p>
      </div>
    </Form>
  );
};

export default Register;
