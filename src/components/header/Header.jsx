import React from "react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from "../profile/Profile";
import { CloseButton } from "react-bootstrap";



const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const expand = 'md'
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar key={expand} bg="light" expand={expand} className="m-3 border-bottom border-primary">
        <Container fluid>
          <Navbar.Brand href="/Dashboard">GetItDone</Navbar.Brand>
          {authCtx.token ?
          <>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href='/Dashboard'>DashBoard</Nav.Link>
                <Nav.Link href='/Messages'>Messages</Nav.Link>
              </Nav>
                <Button className="rounded-0" onClick={()=>authCtx.logout()}>Logout</Button>
          </>
         : <></> }
        </Container>
      </Navbar>
  </>
    
  );
};

export default Header;
