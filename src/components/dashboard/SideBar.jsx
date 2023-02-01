import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsList } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";
import { useContext } from "react";

const SideBar = ({ addTaskModal }) => {
  const [show, setShow] = useState(false);
  const authCtx = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="text-center" variant="primary" onClick={handleShow}>
        <BsList />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex-column">
          <Button onClick={addTaskModal}>Add Task/Project</Button>

          <div>
            <div>
              <NavLink to="/Dashboard">DashBoard</NavLink>
            </div>
            <div>
              <NavLink to="/Profile">Profile</NavLink>
            </div>
            <div>
              <NavLink to="/Messages">Messages</NavLink>
            </div>
          </div>

          <Button variant="primary" onClick={() => authCtx.logout()}>
            Logout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
