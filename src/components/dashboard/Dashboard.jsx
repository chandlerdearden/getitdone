import React from "react";
import { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BackgroundWrapper from "react-big-calendar/lib/BackgroundWrapper";
import Popper from "./Popper";
import "./popper.css"
import axios from "axios";
import AuthContext from "../../store/authContext";
import AddTaskModal from "./AddTaskModal";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    task_id: 1,
    start: new Date("2023-01-26T21:51:00.000Z") ,
    end: new Date("2023-01-26T21:51:00.000Z"),
    title: "special event",
    colorEvento: "red",
    color: "white",
    desc: "this is my description",
  },
];


const Dashboard = () => {
  const authCtx = useContext(AuthContext)
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  
  useEffect(() => {
  const user = localStorage.getItem('userId')
  axios.get(`/tasks/${user}`)
  .then(({data}) => {
    console.log(data)
const mappedTasks = data.map(task => {
  let {task_id, start, end, title, desc, colorEvento, userId} = task
  start = new Date(start)
  end = new Date(end)
  return {
    start,
    end,
    title,
    task_id,
    desc,
    colorEvento,
    userId
  }
})
setTasks(mappedTasks)
}
  )
  // console.log(user)
}, [addTaskModal]
)

  const eventModalHandler = (task) => {
    setShowTaskModal(true);
    setSelectedTask(task);
  };

  const handleOnSelectSlot = (slotInfo) => {
    setAddTaskModal(true)
  }

  return (
    <div className="d-flex">
        <Calendar
          selectable
          onSelectEvent={(task) => eventModalHandler(task)}
          onSelectSlot={handleOnSelectSlot}
          // onDoubleClickEvent={(task) => eventModalHandler(task)}
          localizer={localizer}
          events={tasks}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800, margin: 30 }}
          eventPropGetter={(myEventsList) => {
            const backgroundColor = myEventsList.colorEvento
              ? myEventsList.colorEvento
              : "blue";
            const color = myEventsList.color ? myEventsList.color : "white";
            return { style: { backgroundColor, color } };
          }}
        />
      {showTaskModal && <Popper show={setShowTaskModal} task={selectedTask} />}
      {addTaskModal && <AddTaskModal show={addTaskModal} setShow={setAddTaskModal}/>}
    </div>
  );
};

export default Dashboard;
