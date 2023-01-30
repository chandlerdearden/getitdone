import React from 'react'
import AddmessageForm from './MessageForm'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'


const Messages = () => {
  const [userMessages, setUserMessages] = useState([])

  const getMessages = () => {
    const user = localStorage.getItem('userId')
    console.log("got messages")
    axios.get(`/messages/${user}`)
    .then(({data}) => {
      setUserMessages(data)
      console.log(data)
    }
    )
  }

  const deleteHandler = (id) => {
    axios.delete(`/messages/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
    getMessages()
    
  }
  
  
  const mappedMessages = () => {
    return userMessages.map(message => {
      return (
        <div key={message.message_id}>
          <h3>From: {message.user.username}</h3>
          <h1>{message.subject}</h1>
          <p>{message.content}</p>
          <Button onClick={() => deleteHandler(message.message_id)}>Delete</Button>
        </div>
      )
    })
    
  }
  

  useEffect(() => {
    getMessages()
    mappedMessages()
  }, [])



  return (
    <div>
      <div>
       {mappedMessages()}
      </div>
      Received Messages
      <div>
        <AddmessageForm getMessages={getMessages}/>
      </div>
    </div>

  )
}

export default Messages
