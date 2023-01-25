import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../store/authContext";
import { Form, Button, Col, Row } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  const [register, setRegister] = useState(false)

  const authCtx = useContext(AuthContext);

  const toggleRegister = () => {
    setRegister(!register)
  }

  return (
    <>
    {register ? <Register/> : <Login/>}
      <div className="row">
      <Button
        onClick={() => {
            toggleRegister();
        }}
        varient="primary"
        type="button"
        >
        Need to {!register ? "Register": "Login"}?
      </Button>
          </div>
            </>
  );
};

export default Landing;
