import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const Register = () => {
  const authCtx = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    if(username && password) {
        const registerUser = {
          username,
          password,
          email,
          firstName,
          lastName,
          color: "red"
        };
        console.log(registerUser);
        axios.post(`/register`, registerUser)
        .then(({data}) => {
            authCtx.login(data.token, data.exp, data.userId)
        })
        .catch(err =>{
           console.log(err)
           setEmail('')
           setFirstName('')
           setLastName('')
           setPassword('')
           setUsername('')
        })
    } else {
        console.log('Username & Password are required')
    }
  };
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label column sm="2">
            *Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Username"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm="2">
            *Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formFirstName">
          <Form.Label column sm="2">
            First Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formLastName">
          <Form.Label column sm="2">
            Last Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
