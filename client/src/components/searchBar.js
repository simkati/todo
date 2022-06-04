import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../store/searchSlice'

//This function will display searchbar
export default function SearchBar() {
  //state for hold the form fields
  const [search, setSearchForm] = useState({ keyword: "", field: "name",});
  const dispatch = useDispatch();
  //update the state when folm fields changing
  function updateForm(value) {
    return setSearchForm((prev) => {
      return { ...prev, ...value };
    });
  }
//set the search values in the state
  function onSubmit(e) {
    e.preventDefault();
    dispatch(setSearch(search));
  }
  //empty search values
  function clearSearch() {
    updateForm({keyword: ""});
    dispatch(setSearch({...search, keyword: ""}));
  }
//display search-bar
  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            id="keyword"
            value={search.keyword}
            onChange={(e) => updateForm({ keyword: e.target.value })}
            placeholder="keyword"
          />
          <select
            name="field"
            id="field"
            onChange={(e) => updateForm({ field: e.target.value })}>
             <option value="name">Name</option>
             <option value="tag">Tag</option>
          </select>
          <button type="submit">Search</button>
      </form>
      <button className="clear-btn" onClick={clearSearch}>clear</button>
    </div>
  )
}
