import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { refreshCollection, selectFilteredCollection } from '../store/collectionSlice';
import TaskList from './taskList'
import CreateCollection from './createCollection';
import SearchBar from './searchBar';

export default function Collections() {

 const dispatch = useDispatch();
 const collections = useSelector(selectFilteredCollection);

 // This method fetches the records from the database at first render
 useEffect(() => {
   async function getCollections() {
     const response = await fetch(`http://localhost:5000/collection/`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const collections = await response.json();
     //update state in the datastore
     dispatch(refreshCollection(collections));
   };
   getCollections();
   return;
 }, []);

 // This following section will display the list of collections.
 const collectionList = collections.map(collection  => {
        return (
             <div className='collection' key={collection._id}>
               <div className='collection-head'>
                 {collection.name + " "}
                 <Link className="nav-link" to={`/create/${collection._id}`}>
                   add task
                 </Link>
               </div>
               <div className='task-list'>
                <TaskList tasks={collection.tasks} collectionId={collection._id}/>
               </div>
             </div>
        )
      });

 return (
   <div>
     <div className='toolbar'>
       <h3>Todo list</h3>
       <CreateCollection />
       <SearchBar />
     </div>
     {collections.length > 0 ? <div>{collectionList}</div> : <div>There is no collections</div>}
   </div>
 );
}
