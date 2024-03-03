import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./Componennts/TaskForm";
import AddTask from './Componennts/AddTask';
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddTask />}/>
            <Route path="/taskform" element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
