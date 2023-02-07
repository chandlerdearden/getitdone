import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import ProfileImg from "./profile-image.png";

const Profile = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [color, setColor] = useState(localStorage.getItem("color"));
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const getUser = () => {
    axios.get(`/user/${userId}`).then(({ data }) => {
      setUser(data);
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const color = localStorage.getItem("color");
    setUserId(userId);
    setColor(color);
    getUser();
  }, []);

  return (
    <>
      <Container fluid className="m-0">
        <Row className="m-0">
          <ProfileCard user={user} show={show} setShow={setShow} />
        </Row>
      </Container>
      <EditProfile user={user} show={show} setShow={setShow}/>
    </>
  );
};

export default Profile;
