import React from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectCollections } from '../store/collectionSlice';
import TaskForm from './taskForm';

export default function CreateTask() {

 const navigate = useNavigate();
 const params = useParams();
 const dispatch = useDispatch();
 const collections = useSelector(selectCollections);
 //identifiers about the collection for the form
 const collectionId = params.collectionId?.toString();
 const collectionIndex = collections.indexOf(collections.find(collection => collection._id === collectionId));
 //empty task for the form
 const task = {
   name: "",
   complete: false,
   tags: [],
  };

 // This function will handle the submission.
 async function sendTaskForm(task, collectionId, collectionIndex) {
   // When a post request is sent to the create url, we'll add a new record to the database.
   await fetch(`http://localhost:5000/collection/addTask/${collectionId}`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(task),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   //update state
   dispatch(addTask({collectionIndex: collectionIndex, task: task}));
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
return <TaskForm callBack={sendTaskForm} task={task} collectionId={collectionId} index={collectionIndex}/>
}
