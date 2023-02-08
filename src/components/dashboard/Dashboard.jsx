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
import { Container,Row,Col, Offcanvas, Button } from "react-bootstrap";
import { BsJustify } from "react-icons/bs";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([])
  const [events, setEvents] = useState([])
  const [selectedTask, setSelectedTask] = useState({});
  const [byTasks, setByTasks] = useState(false)
  const [byProjects, setByProjects] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {

    async function fetchData() {
      const user = localStorage.getItem('userId')
      const userTasks = await axios.get(`/tasks/${user}`);
      const userProjects = await axios.get(`/projects/${user}`);
      const mergedData = [...userTasks.data, ...userProjects.data]
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
      setTasks(userTasks.data)
      setProjects(userProjects.data)
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

  const filterEvents = () => {
    if(byProjects === true && byTasks === false) {
      return projects
    } else if (byTasks === true && byProjects === false) {
      return tasks
    } else {
      return events
    }
  }

  return (
    <>
    <Container fluid className="d-flex m-0 w-100 justify-content-center">
      <Row className="m-0 d-flex w-100">
      <Col xl={3} xxl={3} className='d-none d-xl-block'>
      <SideBar
      byTasks = {byTasks}
      byProjects = {byProjects} 
      filterByTasks={setByTasks} 
      filterByProjects={setByProjects} 
      addTaskModal={handleAddTaskModal}/>
      </Col>
      <Col className="d-xl-none ">
      <Button style={{backgroundColor: 'transparent'}} variant="primary" className="d-xl-none rounded-0 my-2" onClick={handleShow}>
        <BsJustify style={{color: 'blue'}}/>
      </Button>
        <Offcanvas  show={show} onHide={handleClose} responsive="xl" >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
          <SideBar
      byTasks = {byTasks}
      byProjects = {byProjects} 
      filterByTasks={setByTasks} 
      filterByProjects={setByProjects} 
      addTaskModal={handleAddTaskModal}/>
          </Offcanvas.Body>
        </Offcanvas>
      </Col>
      <Col xl={9} xxl={9} id="calendar"  className=" m-0 p-3 border shadow">
        <Calendar
          selectable
          onSelectEvent={(task) => eventModalHandler(task)}
          // onSelectSlot={handleOnSelectSlot}
          localizer={localizer}
          events={filterEvents()}
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
