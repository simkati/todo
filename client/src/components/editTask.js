import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/collectionSlice';
import { useParams, useNavigate } from "react-router";
import { useLocation } from 'react-router-dom'
import TaskForm from './taskForm';

export default function EditTask() {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  //identifiers about collection and task from the url
  const collectionId = params.collectionId?.toString();
  const taskIndex = params.taskIndex?.toString();
  const { task } = location.state;

  //This function will send the data to the server for update database and update the state
     async function taskUpdate(task, collectionId, taskIndex) {

         await fetch(`http://localhost:5000/collection/taskupdate/${collectionId}/${taskIndex}`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({task: task}),
         }).catch(error => {
            window.alert(error);
            return;
          });
          dispatch(updateTask({task: task, taskIndex: taskIndex, collectionId: collectionId,}));
          navigate("/");
       };
  //This section render the form
  return <TaskForm callBack={taskUpdate} index={taskIndex} task={task} collectionId={collectionId} />
}
