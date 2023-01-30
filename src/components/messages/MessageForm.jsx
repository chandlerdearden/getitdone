import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'


const AddmessageForm = ({getMessages}) => {
    const [creator_id, setCreatorId] = useState(localStorage.getItem('userId'))
    const [content, setContent] = useState('')
    const [subject, setSubject] = useState('')
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const submitHandler = (e) => {
        e.preventDefault()
        const message = {
            creator_id: +creator_id,
            userId: +userId,
            content,
            subject,
        }
        axios.post('/messages', message)
        .then((res) => console.log("Message was added"))
        getMessages()
        console.log(message)
    }
  return (
    <div>
        <Form onSubmit={submitHandler}>
        <Form.Group onChange={(e) => setSubject(e.target.value)} controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>

        <Form.Group onChange={(e) => setContent(e.target.value)} controlId="description">
          <Form.Label>Details</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      
    </div>
  )
}

export default AddmessageForm

