import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Container>
      <Row xs={12} sm={12} md={8} lg={8}>
        <Col md={4} sm={6} xs={6} lg={5}>GetItDone</Col>
        {authCtx.token && (
          <Col>
            <NavLink to="/Dashboard">DashBoard</NavLink>
          </Col>
        )}
        {authCtx.token && (
          <Col>
            <NavLink to="/Profile">Profile</NavLink>
          </Col>
        )}
        {authCtx.token && (
          <Col>
            <NavLink to="/Messages">Messages</NavLink>
          </Col>
        )}
        {authCtx.token && (
          <Col>
            <Button variant="primary" onClick={() => authCtx.logout()}>
              Logout
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Header;
