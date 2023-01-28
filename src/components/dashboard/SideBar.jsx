import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';



const SideBar = ({addTaskModal}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div id='sidebar_container'>
            <div>Photo</div>
            
            <Button onClick={addTaskModal}>Add Task/Project</Button>
            <Button>Message</Button>

            
        </div>
    );
}

export default SideBar
