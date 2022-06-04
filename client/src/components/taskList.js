import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/collectionSlice';

//This function will display tasks inside collections
export default function TaskList(props) {
   const dispatch = useDispatch();

//This function will send the data to the server for update database and update the state
  async function taskUpdate(taskIndex, task) {

      const updatedTask = {
        name: task.name,
        complete: !task.complete,
        tags: task.tags,
      }
      //send data to the server
       await fetch(`http://localhost:5000/collection/taskupdate/${props.collectionId}/${taskIndex}`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({task: updatedTask}),
       }).then(resp => {
         if (resp.status === 200) {
               return resp.json()
           } else {
               console.log("Status: " + resp.status)
               return Promise.reject("server")
           }
       }).catch(error => {
         window.alert(error);
         return;
       });
       //update state
       dispatch(updateTask({task: updatedTask, index: taskIndex, id: props.collectionId,}));
     };

// This following section will display the list of tasks with their properties.
  return props.tasks.map((task, index) => {
    return (
      <div className='task' key={task.name} >
        <div>
          <div className='task-name'>{task.name}</div>
          {task.complete && <div className='done'>Done</div>}
          <div className='tag-container'>{task.tags.map((tag, i) => <p className='tag-item' key={i} >{tag}</p>)}</div>
        </div>
        <div className='action-btns'>
          <button onClick={() => taskUpdate(index, task)}>{task.complete ? 'Uncomplete' : 'Complete'}</button>
          <div className='edit-btns'>
            <Link className="nav-link" to={`/edit/${props.collectionId}/${index}`} state={{ task: task }}>
              Edit task
            </Link>
          </div>
        </div>
      </div>
  )
});

}
