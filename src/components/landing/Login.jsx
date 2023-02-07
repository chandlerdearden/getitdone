import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Container from "react-bootstrap/Container";

const Login = ({toggleRegister}) => {
  const authCtx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false)
  const loginHandler = (e) => {
    e.preventDefault();

    const user = {
      username: username.trim(),
      password: password.trim()
    };
    axios
      .post(`/login`, user)
      .then(({ data }) => {
        console.log(data);
        authCtx.login(data.token, data.exp, data.userId, data.color);
      })
      .catch((err) => {
        console.log(err);
        setLoginErr(true)
        setPassword("");
        setUsername("");
      });

    console.log("Login User");
  };
  return (
    <Form onSubmit={loginHandler}>
      <Form.Group className="mb-3"  controlId="formUsername">
        <Row className="justify-content-md-center">
        <Col sm="8">
        <Form.Label>
          Username
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

      <Form.Group className="mb-3"  controlId="formPassword">
        <Row className="justify-content-md-center">
        <Col sm="8">
        <Form.Label>
          Password
        </Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Row className="justify-content-md-center m-2" style={{color: "red"}}>{loginErr && "The Username or Password you entered is incorrect"}</Row>
      <Row className="justify-content-md-center">
        <Col sm='8' className="text-center">
        <Button className="rounded-0" variant="primary" type="submit">
          Login
        </Button>
        </Col>
      </Row>
      </Form.Group>



      <div className="mt-3">
        <p className="mb-0  text-center">
          Don't have an account?{" "}
          <a
            onClick={() => {
              toggleRegister();
            }}
            className="text-primary fw-bold"
            style={{cursor: 'pointer'}}
          >
            Sign Up
          </a>
        </p>
      </div>
    </Form>
  );
};

export default Login;
