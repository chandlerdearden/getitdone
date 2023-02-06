import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import ProfileImg from './profile-image.png'

const Profile = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [color, setColor] = useState(localStorage.getItem("color"));
  const [user, setUser] = useState({});

  const getUser = () => {
    axios.get(`/user/${userId}`).then(({ data }) => {
      console.log(data);
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
    <Container fluid className="m-5  d-flex">
      <Row md={4} className="m-0">
      <ProfileCard user={user}/>
      </Row>
      <Row md={8} className="m-0">
      <EditProfile user={user}/>    
      </Row>
    </Container>
  );
};

export default Profile;
