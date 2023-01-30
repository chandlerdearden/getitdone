import React from 'react'
import Button from 'react-bootstrap/Button';



const SideBar = ({addTaskModal}) => {
    return (
        <div id='sidebar_container'>
            <div>Photo</div>
            
            <Button onClick={addTaskModal}>Add Task/Project</Button>

            
        </div>
    );
}

export default SideBar
