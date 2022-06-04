import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { selectCollections } from '../store/collectionSlice';
//Task form component it is used for edit or create task inside a collection
//props collectionId, index (edit: task index, create: collection index), callback function to save the data, task object
export default function TaskForm(props) {
//this state hold the form values
 const [task, setTask] = useState({
   name: props.task.name,
   complete: props.task.complete,
   tags: props.task.tags,
 });
 //this state for undo function hold earlier task states
  const [taskStateHolder, setTaskStateHolder] = useState({
    stateIndex: 0,
    taskStates: [task],
  })
 //get this task's to which collaction belongs
 const collections = useSelector(selectCollections);
 const collection = collections.find(collection => collection._id === props.collectionId);
 //this state for error message when name input not valid
 const [nameInputError, setNameInputError] = useState("");
//this function check value is valid in name input field
 function nameInputValidator(value) {
   if (!value.trim()) {
     setNameInputError(() => 'Name must not be empty!');
   } else if (collection.tasks.some((task) => task.name === value)) {
      setNameInputError(() => 'Task name must be uniq!');
   } else {
     setNameInputError(() => '');
   }
   updateForm({ name: value });
 }
 // These methods will update the state properties.
 function updateForm(value) {
    setTask((prev) => {
     return { ...prev, ...value };
   });
   setTaskStateHolder((prev) => {
    return { stateIndex: prev.stateIndex++ , taskStates: [...prev.taskStates.slice(0, prev.stateIndex), { ...task, ...value }]};
  });
 }
 //this function set task state back with one step
 function undo() {
   if (taskStateHolder.stateIndex > 0) {
       setTask((prev) => {
        return taskStateHolder.taskStates[taskStateHolder.stateIndex-1];
      });
      setTaskStateHolder((prev) => {
       return { ...prev , stateIndex: prev.stateIndex-1 }
     });
   }
 };
 //this function set task state forward with one step
 function redo() {
   if (taskStateHolder.stateIndex < taskStateHolder.taskStates.length-1) {
       setTask((prev) => {
        return taskStateHolder.taskStates[taskStateHolder.stateIndex+1];
      });
      setTaskStateHolder((prev) => {
       return { ...prev , stateIndex: prev.stateIndex+1 }
     });
   }
 };
 //handle for tags input
  function handleKeyDown(event) {
         if(event.key !== 'Enter') return;
         const value =event.target.value;
         if(!value.trim()) return;
         setTask({ ...task, tags: [...task.tags, value]});
         event.target.value = '';
         setTaskStateHolder((prev) => {
          return { stateIndex: prev.stateIndex++ , taskStates: [...prev.taskStates, { ...task, tags: [...task.tags, value]}]};
        });
     }
 //remove tag from the input when click x
 //parameter index a number, it is the tag's index in the array
 function removeTag(index){
         setTask({ ...task, tags: task.tags.filter((el, i) => i !== index)})
     }
//send data to the server and refresh state, function is called from edit/create task js
function sendData (task, id, index) {
  if (task.name !== "" && nameInputError === "") {
    props.callBack(task, id, index);
  }
}
//when cancel button clicked it is navigate back to the main page
const navigate = useNavigate();
function navigateBack() {
  navigate("/");
}
 // This following section will display the form that takes the input from the user.
 return (
   <div className='task-form'>
     <div className='task-form-header'>
       <h3>{props.task.name ? "Edit" : "Create new"} task in {collection.name} collection</h3>
       <div className='action-btn-group'>
         <button className='undo-btn' onClick={undo} >Undo</button>
         <button className='redo-btn' onClick={redo} >Redo</button>
       </div>
   </div>
     <form>
       <div className="form-group">
         <label htmlFor="name">Name:</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={task.name}
           onChange={(e) => nameInputValidator( e.target.value )}
         />
       {nameInputError && <p className='input-error'>{nameInputError}</p>}
       </div>

       <div className="form-group">
          <p className='label'>Tags:</p>
           <div className="tags-input-container">
               { task.tags.map((tag, index) => (
                 <div className="tag-item" key={index}>
                     <span className="text">{tag}</span>
                     <span className="close" onClick={() => removeTag(index)}>&times;</span>
                 </div>
             )) }
             <input type="text" onKeyDown={handleKeyDown} className="tags-input" placeholder="Type your tags" />
          </div>
       </div>

       <div className="form-group">
         <div className="form-check form-check-inline">
           <label htmlFor="complete" className="form-check-label">complete:</label>
           <input
             className="form-check-input"
             type="checkbox"
             name="complete"
             id="complete"
             checked={task.complete}
             onChange={(e) => updateForm({ complete: e.target.checked })}
           />
         </div>
       </div>
       <div className="form-group">
         <p className='save-btn' onClick={() => sendData(task, props.collectionId, props.index)}>Save</p>
         <p className='cancel-btn' onClick={navigateBack}>Cancel</p>
       </div>
     </form>
   </div>
 );
}
