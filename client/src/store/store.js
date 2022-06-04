import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collectionSlice";
import searchReducer from "./searchSlice";

export default configureStore({
  reducer: {
    collections: collectionsReducer,
    search: searchReducer,
  }
});
