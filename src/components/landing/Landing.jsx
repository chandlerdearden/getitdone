import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../store/authContext";
import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  const [register, setRegister] = useState(false);

  const authCtx = useContext(AuthContext);

  const toggleRegister = () => {
    setRegister(!register);
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2  text-center ">GitItDone</h2>
                <p className=" mb-5 text-center">
                  {register? "Please Fill in this form to create an account!": "Please Enter your Username and Password" }
                </p>
              <Row>{register ? <Register toggleRegister={toggleRegister}/> : <Login toggleRegister={toggleRegister} />}</Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
