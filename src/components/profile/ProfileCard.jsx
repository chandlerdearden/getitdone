import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import profileImage from "../assets/profile-image.png";

const ProfileCard = ({ user, show, setShow }) => {
  return (
    <Card style={{ width: "18rem" }} className="border-0 border-bottom">
      <p  onClick={()=> setShow(!show)} style={{color: "blue", cursor: "pointer"}} className="m-0 text-end">
        Edit
      </p>
      <Card.Img variant="top" src={profileImage} />
      <Card.Body className="text-center">
        <Card.Title>{user.username}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {user.firstname} {user.lastname}
        </ListGroup.Item>
        <ListGroup.Item>{user.email}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProfileCard;
