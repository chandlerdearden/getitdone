import React from "react";
import AddmessageForm from "./MessageForm";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Tab,
  ListGroup,
  Badge
} from "react-bootstrap";
import './message.css'

const Messages = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [state, setState] = useState('')

  const getUsernames = async () => {
    const user = localStorage.getItem("userId");
    await axios.get(`/allusers/${user}`).then(({ data }) => {
      setUsernames(data);
    });
  };

  const getMessages = async () => {
    const user = localStorage.getItem("userId");
    console.log("got messages");
    await axios.get(`/messages/${user}`).then(({ data }) => {
      setUserMessages(data);
      console.log(data);
    });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`/messages/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    getMessages();
  };

  const readHandler = (message) => {
    if(!message.read) {
      axios.put(`/readMessage`, {id: message.message_id})
      setState('updateData')
    } else{

    }
  }
  const mappedLinks = () => {
    return userMessages.sort((a, b) => (+b.message_id > +a.message_id ? 1 : -1)).map((message) => {
      const string = `"#link${message.message_id}"`;
      // console.log(string)
      return (
        <ListGroup.Item key={message.message_id} onClick={()=> readHandler(message)} className="d-flex" href={string}>
          {!message.read && 
          <div className="justify-content-center align-items-center">
          <Badge bg="info">New</Badge>
          </div>}
          From: {message.user.username} <br /> {message.subject}
        </ListGroup.Item>
      );
    });
  };

  const mappedTabs = () => {
    return userMessages.sort((a, b) => (+b.message_id > +a.message_id ? 1 : -1)).map((message) => {
      const string = `"#link${message.message_id}"`;
      return (
        <Tab.Pane key={message.message_id} className="h-100" eventKey={string}>
          <Row className=" m-5 h-75 shadow border d-flex">
          <Col  className="m-0">
          <h3 className="border-bottom">From: {message.user.username}</h3>
          <h4>{message.subject}</h4>
          <p className="h-75 m-3 p-3">{message.content}</p>
          </Col>
          </Row>
          <Row>
          <Col className=" mx-5 d-flex justify-content-end" >
          <Button className="mx-2 rounded-0">Reply</Button>
          <Button className="rounded-0" onClick={()=> deleteHandler(message.message_id)}>Delete</Button>
          </Col>
          </Row>
        </Tab.Pane>
      );
    });
  };

  useEffect(() => {
    getUsernames();
    getMessages();
    mappedLinks();
  }, [state]);

  return (
    <>
      <Container fluid className="d-flex h-100 " >
        <Row className="w-100 h-100 m-5">
          <Row className="align-items-center m-0 p-0">
            <Col>
              <h1>Messages</h1>
            </Col>
            <Col>
            <Button onClick={()=> setShowForm(true)} className="rounded-0">Send Message</Button>
            </Col>
          </Row>
          <Tab.Container className="h-100">
          <Row className="m-0 p-0">
            <Col className="m-0 p-0 w-100">
              <ListGroup className="rounded-0" style={{ cursor: "pointer" }}>
          <div id="scroll" className='border'style={{height:"60vh"}}>
                {mappedLinks()}
          </div>
              </ListGroup>
            </Col>

            <Col className="m-0 p-0 w-100">
              <Tab.Content className="m-0 p-0 h-100 border">{mappedTabs()}</Tab.Content>
            </Col>
          </Row>
          </Tab.Container>
        </Row>
      </Container>
        <AddmessageForm setShow={setShowForm}  show = {showForm} usernames={usernames} getMessages={getMessages} />
    </>
  
  );
};

export default Messages;
