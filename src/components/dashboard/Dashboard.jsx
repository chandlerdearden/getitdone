import React from "react";
import { useState, useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popper from "./Popper";
import "./popper.css"
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import SideBar from "./SideBar";
import "./dashboard.css"
import { Container,Row,Col } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([])
  const [events, setEvents] = useState([])
  const [selectedTask, setSelectedTask] = useState({});
  
  useEffect(() => {

    async function fetchData() {
      const user = localStorage.getItem('userId')
      const userTasks = await axios.get(`/tasks/${user}`);
      const userProjects = await axios.get(`/projects/${user}`);
      const mergedData = [...userTasks.data, ...userProjects.data]
      setTasks(userTasks);
      setProjects(userProjects)
      const mappedEvents = mergedData.map(event => {
        let {id, start, end, title, desc, colorEvento, userId} = event
        start = new Date(start)
        end = new Date(end)
        return {
          start,
          end,
          title,
          id,
          desc,
          colorEvento,
          userId
        }
      })
      setEvents(mappedEvents)
    }
    fetchData();
  }, [addTaskModal, showTaskModal]);

  const eventModalHandler = (task) => {
    setShowTaskModal(true);
    setSelectedTask(task);
  };

  const handleAddTaskModal = () => {
    setAddTaskModal(true)
  }

  return (
    <>
    <Container fluid className="d-flex m-0 w-100 justify-content-center">
      <Row className="m-0 d-flex w-100">
      <Col md={2}>
      <SideBar addTaskModal={handleAddTaskModal}/>
      </Col>
      <Col md={10} id="calendar">
        <Calendar
          selectable
          onSelectEvent={(task) => eventModalHandler(task)}
          // onSelectSlot={handleOnSelectSlot}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          eventPropGetter={(myEventsList) => {
            const backgroundColor = myEventsList.colorEvento
            ? myEventsList.colorEvento
            : "blue";
            const color = myEventsList.color ? myEventsList.color : "white";
            return { style: { backgroundColor, color } };
          }}
        />
        </Col>
      </Row>
    </Container>
      {showTaskModal && <Popper show={setShowTaskModal} task={selectedTask} />}
      {addTaskModal && <AddTaskModal show={addTaskModal} setShow={setAddTaskModal}/>}
          </>
  );
};

export default Dashboard;
