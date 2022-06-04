import React, { useState } from "react";
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCollections } from '../store/collectionSlice';
import { addCollection } from '../store/collectionSlice';

export default function CreateCollection() {
  //this state hold the form input field value
 const [name, setName] = useState("");
 //this state for handle popoup it will be open when true
 const [openForm, setOpenForm] = useState(false);
 //this need dispatch the state
 const dispatch = useDispatch();
 //get all collection from state
 const collections = useSelector(selectCollections);
//this state for error message when name input not valid
const [nameInputError, setNameInputError] = useState("");

//this function check value is valid in the name input field and update the state
//value is string
function nameInputValidator(value) {
  if (!value.trim()) {
    setNameInputError(() => 'Name must not be empty!');
  } else if (collections.some((collection) => collection.name === value)) {
     setNameInputError(() => 'Collection name must be uniq!');
  } else {
    setNameInputError(() => '');
  }
  //update the state properties.
  setName(() => value );
}
//This method toggle openForm state between true or false
const toggleOpenForm = () => {setOpenForm((prev) => prev === false ? true : false)};

// This methods will check the validation and if its ok save the data
function onSubmit(e) {
    e.preventDefault();
  //validation check
  if (name !== "" && nameInputError === "") {
    saveData();
  };
}
// These methods will create a collection into tha database and refresh state
async function saveData() {
  //this object will be sent
  const newCollection = {
    _id: "",
    name: name,
    tasks: [],
  }
   await fetch("http://localhost:5000/collection/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newCollection),
   }).then(resp => {
     if (resp.status === 200) {
           return resp.json()
       } else {
           console.log("Status: " + resp.status)
           return Promise.reject("server")
       }
   }).then(dataJson => {
        //get new collection's id from response
        newCollection._id = dataJson.insertedId;
        //add new collection to datastore
        dispatch(addCollection(newCollection));
    })
   .catch(error => {
     window.alert(error);
     return;
   });
   setName( "" );
 };
//next part will display the create collection popup
 return (
   <div className='create-collection'>
      <button onClick={ toggleOpenForm }>Add collection</button>
      { openForm &&
        <div className='create-collection-form'>
          <p className='close' onClick={ toggleOpenForm }><IoClose /></p>
          <h3>Create collection</h3>
         <form  onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text"
                    id="name"
                    placeholder="collection's name"
                    value={name}
                    onChange={(e) => nameInputValidator( e.target.value )}
                  />
                {nameInputError && <p className='input-error'>{nameInputError}</p>}
              </div>
           <button type="submit">Save</button>
        </form>
      </div>
      }
    </div>
    )
}
