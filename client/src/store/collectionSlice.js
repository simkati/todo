import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createSelector } from "@reduxjs/toolkit";


//This methode create reducers for handle collections state
const collectionsSlice = createSlice({
  name: 'collections',
  initialState: [],
  reducers: {
    addCollection: (state, action) => [...state, action.payload],
    refreshCollection: (state, action) => action.payload,
    addTask: (state, action) => {
      void [...state, state[action.payload.collectionIndex].tasks.push(action.payload.task)];
      },
    updateTask: (state, action) =>  {
      void state.map( collection => {
          if(collection._id === action.payload.id) {
            return {...collection, tasks: [...collection.tasks, collection.tasks[action.payload.index] = action.payload.task]};
          } else {
            return collection;
          }
        })
      },
    },
});
//this selector give back all the collections in a array
export const selectCollections = (state) => state.collections;
const selectSearch = (state) => state.search;

//this selector give back a filtered list about coolection by search state
export const selectFilteredCollection = (state) => {
 let collections = selectCollections(state);
 const searchTerm = selectSearch(state);
 let filteredCollection = [];
//when keyword empty give back all the collections
 if (searchTerm.keyword === "") {
   return collections;
 };
 //filter part
 for (let i = 0; i < collections.length; i++ ) {
   const filteredTask = collections[i].tasks.filter((task) => {
     if (searchTerm.field === "name") {
       return task.name.toLowerCase().includes(searchTerm.keyword.toLowerCase());
     } else if (searchTerm.field === "tag" ) {
       return task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.keyword.toLowerCase()));
     }
  });
  if (filteredTask.length > 0) {
    filteredCollection = [...filteredCollection, {...collections[i], tasks: filteredTask}];
  }
 };
return filteredCollection;
};
//export actions for set the state
export const {
   addCollection,
   refreshCollection,
   addTask,
   updateTask,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
