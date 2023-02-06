import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import profileImage from '../assets/profile-image.png'


const ProfileCard = ({user}) => {
  return (
    <Card style={{ width: '18rem'}} className='mx-5 border'>
    <Card.Img variant="top" src={profileImage} />
    <Card.Body className='text-center'>
      <Card.Title>{user.username}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      {/* <ListGroup.Item>Firstname: {user.firstname}</ListGroup.Item>
      <ListGroup.Item>Lastname: {user.lastname}</ListGroup.Item>
      <ListGroup.Item>Email: {user.email}</ListGroup.Item> */}
    </ListGroup>
  </Card>
  )
}

export default ProfileCard
