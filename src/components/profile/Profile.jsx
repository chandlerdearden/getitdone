import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container,Row,Col } from 'react-bootstrap'
import ProfileCard from './ProfileCard'

const Profile = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [color, setColor] = useState(localStorage.getItem('color'))
  const [user, setUser] = useState({})

  const getUser = () => {
    axios.get(`/user/${userId}`)
    .then(({data}) => {
      console.log(data)
      setUser(data)
    }
    )
    
  }
  


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const color = localStorage.getItem('color')
    setUserId(userId)
    setColor(color)
    getUser()
  }, []);
  
  return (
    <Container fluid className=' d-flex border  h-100'>
      <Row>
        <ProfileCard user={user}/>
      </Row>
      <Row>
  
      </Row>
    </Container>
  )
}

export default Profile
