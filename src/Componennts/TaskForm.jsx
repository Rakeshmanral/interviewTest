import React from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const URL = "https://interview-test-project.glitch.me/todolist"

function TaskForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      duedate: "",
      pname: "",
      priority: "",
      tags: "",
      status: ""
    },
  });
  const onSubmit = async(data)=>{
    await axios.post(URL,data);
    navigate('/')
  }

  
  
  return (
    <>
    <div className="align-items-center container d-flex flex-column justify-content-center py-4">
    <h1 className='mb-4 text-center'>Add Task</h1>
    <div className="w-50 shadow-lg p-3 mb-5 bg-white rounded">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
          <label htmlFor='title'>Title</label>
          <input type="text" className="form-control mt-1" placeholder="Title" {...register("title", {required: true, maxLength: 80})} />
          {errors.title && <span className="d-block mt-2 text-danger">This field is required</span>}
       </div>
       <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control mt-1"
            name="description"
            id="description"
            placeholder="Description"
            required=""
            {...register("description", {required: true, maxLength: 200})}
            
          />
          {errors.description && <span className="d-block mt-2 text-danger">This field is required</span>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor='duedate'>Due Date</label>
          <input className="form-control mt-1" type="date" placeholder="dsadsa" {...register("duedate",{ required: true })}/>
          {errors.duedate && <span className="d-block mt-2 text-danger">This field is required</span>}
       </div>
        <div className="form-group mb-3">
          <label htmlFor="priority">Priority</label>
            <select className="form-select mt-1" {...register("priority", { required: true })}>
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && <span className="d-block mt-2 text-danger">This field is required</span>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status">Status</label>
          <select className="form-select mt-1" {...register("status", { required: true })}>
          <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <span className="d-block mt-2 text-danger">This field is required</span>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="assignedto">Assigned To</label>
          <input className="form-control mt-1" type="text" placeholder="Person name" {...register("pname", {required: true, maxLength: 100})} />
          {errors.pname && <span className="d-block mt-2 text-danger">This field is required</span>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="Tags">Tags</label>
          <select className="form-select mt-1" {...register("tags", { required: true })}>
          <option value="">Select Tags</option>
            <option value="Tag1">Tag1</option>
            <option value="Tag2">Tag2</option>
            <option value="Tag3">Tag3</option>
          </select>
          {errors.tags && <span className="d-block mt-2 text-danger">This field is required</span>}
        </div>
      <button type="submit" className="btn btn-primary mt-3">Submit Task</button>
    </form>
    </div>
    </div>
    </>
  );
}

export default TaskForm;
