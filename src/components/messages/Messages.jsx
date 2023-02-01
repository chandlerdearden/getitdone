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
} from "react-bootstrap";

const Messages = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [usernames, setUsernames] = useState([]);

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

  const mappedLinks = () => {
    return userMessages.map((message) => {
      const string = `"#link${message.message_id}"`;
      // console.log(string)
      return (
        <ListGroup.Item className="d-flex" href={string}>
          From: {message.user.username} <br /> {message.subject}
        </ListGroup.Item>
      );
    });
  };

  const mappedTabs = () => {
    return userMessages.map((message) => {
      const string = `"#link${message.message_id}"`;
      return (
        <Tab.Pane eventKey={string}>
          <Row>
          <Col>{message.content}</Col>
          </Row>
          <Row className="m-0 p-0 w-100 d-flex justify-content-end">
          <Col md={2} className='d-flex'><Button>Delete</Button></Col>
          </Row>
        </Tab.Pane>
      );
    });
  };

  useEffect(() => {
    getUsernames();
    getMessages();
  }, []);

  return (
      <Container fluid className="border d-flex h-100 " >
        <Row className="w-100 h-100 border m-5 border-dark">
          <Row className="align-items-center border-bottom m-0 p-0">
            <Col>
              <h1>Messages</h1>
            </Col>
            <Col>
            <Button className="rounded-0">Send Message</Button>
            </Col>
          </Row>
          <Tab.Container className="h-100">
          <Row>
            <Col className="m-0 p-0 w-100">
              <ListGroup className="rounded-0" style={{ cursor: "pointer" }}>
                {mappedLinks()}
              </ListGroup>
            </Col>
            <Col>
              <Tab.Content>{mappedTabs()}</Tab.Content>
            </Col>
          </Row>
          </Tab.Container>
        </Row>
      </Container>
      /* <Row>
          <AddmessageForm usernames={usernames} getMessages={getMessages} />
        </Row> */
  );
};

export default Messages;
