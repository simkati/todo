import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import App from './App';
import store from "./store/store";
import EditTask from "./components/editTask";
import CreateTask from "./components/createTask";

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/edit/:collectionId/:taskIndex" element={<EditTask />} />
            <Route path="/create/:collectionId" element={<CreateTask/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
