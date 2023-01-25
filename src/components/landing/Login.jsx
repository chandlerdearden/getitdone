import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState, useContext } from 'react';
import axios from 'axios'
import AuthContext from '../../store/authContext';

const Login = () => {
  const authCtx = useContext(AuthContext)
  const baseUrl = "http://localhost:4056"

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const loginHandler = (e) => {
    e.preventDefault()

    const user = {
      username,
      password,
    }
    axios.post(`${baseUrl}/login`, user)
    .then(({data}) => {
      authCtx.login(data.token, data.exp, data.userId)      
    }
    )
    .catch(err => {
      console.log(err)
    setPassword('')
    setUsername('')
    })
  
    console.log('Login User')
  }
  return (
    <Form onSubmit ={loginHandler}>
    <Form.Group as={Row} controlId="formUsername">
      <Form.Label column sm="2">
        Username
      </Form.Label>
      <Col sm="10">
        <Form.Control onChange={(e) => {
          setUsername(e.target.value)
        }
        } type="text" placeholder="Username" />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formPassword">
      <Form.Label column sm="2">
        Password
      </Form.Label>
      <Col sm="10">
        <Form.Control onChange={(e) => { setPassword(e.target.value)
          
        }
        } type="password" placeholder="Password" />
      </Col>
    </Form.Group>

    <Button variant="primary" type="submit">
      Login
    </Button>
        </Form>
  )
}

export default Login
