import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div>
      <div style={{backgroundColor:color, height: 200}}>Profile Image {user.username}</div>
      <div>
        <h3>First Name: {user.firstname}</h3>
        <h3>Last Name: {user.lastname}</h3>
        <h3>Email: {user.email}</h3>
        <h5>Change Password?</h5>
        <div>
          Assigned Tasks
        </div>
      </div>
    </div>
  )
}

export default Profile
