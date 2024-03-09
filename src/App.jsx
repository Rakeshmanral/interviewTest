import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./Componennts/TaskForm";
import AddTask from './Componennts/AddTask';
import EditTaskForm from './Componennts/EditTaskForm';
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddTask />}/>
            <Route path="/taskform" element={<TaskForm />} />
            <Route path="/editForm/:Id" element={<EditTaskForm />  } />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
