import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./Componennts/TaskForm";
const Routers = () => {
  return (
    <>
    <BrowserRouter>
          <Routes>
          <Route path="/"  />
            <Route path="/taskform" element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
    
    </>
  )
}

export default Routers