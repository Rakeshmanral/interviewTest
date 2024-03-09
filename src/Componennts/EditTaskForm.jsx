import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
const URL = "http://localhost:4200/todolist"

function EditTaskForm() {
    
    const navigate = useNavigate();
    const { Id } = useParams();
    const [data, setData] = useState();
    const { register, handleSubmit, formState: { errors },reset } = useForm({
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


    const tbdata = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        reset(response.data);
      };
    
      useEffect(() => {
        tbdata(Id)
      }, [Id])
   


      const onSubmit = async (data, id) => {
        console.log('hey i am connected ');
        await axios.put(`${URL}/${Id}`, data).then((res) => {
          toast.success("Edited")
          navigate('/')
        }).catch((err) => {
          console.log("Error");
          toast.error("Something went wrong")
        })
    
      }
    
      // Options for the select input
      const options = [
        { value: 'Tag1', label: 'Tag1' },
        { value: 'Tag2', label: 'Tag2' },
        { value: 'Tag3', label: 'Tag3' }
      ];



    return (
        <>
            <div className="align-items-center container d-flex flex-column justify-content-center py-4">
            <button className="btn btn-primary">Back Task List</button>
                <h1 className='mb-4 text-center'>Update Task</h1>
                <div className="w-50 shadow-lg p-3 mb-5 bg-white rounded">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-3">
                            <label htmlFor='title'>Title</label>
                            <input type="text" defaultValue={data?.title} className="form-control mt-1" placeholder="Title" {...register("title", { required: true, maxLength: 80 })} />
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
                                {...register("description", { required: true, maxLength: 200 })}

                            />
                            {errors.description && <span className="d-block mt-2 text-danger">This field is required</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='duedate'>Due Date</label>
                            <input className="form-control mt-1" type="date" placeholder="dsadsa" {...register("duedate", { required: true })} />
                            {errors.duedate && <span className="d-block mt-2 text-danger">This field is required</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="priority">Priority</label>
                            <select  className="form-select mt-1" {...register("priority", { required: true })} >
                                <option value="">Select Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {errors.priority && <span className="d-block mt-2 text-danger">This field is required</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="status">Status</label>
                            <select  className="form-select mt-1" {...register("status", { required: true })}>
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="inprogress">In progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && <span className="d-block mt-2 text-danger">This field is required</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="assignedto">Assigned To</label>
                            <input className="form-control mt-1" type="text" placeholder="Person name" {...register("pname", { required: true, maxLength: 100 })} />
                            {errors.pname && <span className="d-block mt-2 text-danger">This field is required</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="Tags">Tags</label>
                            <select  className="form-select mt-1" {...register("tags", { required: true })}>
                                <option value="">Select Tags</option>
                                <option value="Tag1">Tag1</option>
                                <option value="Tag2">Tag2</option>
                                <option value="Tag3">Tag3</option>
                            </select>
                            {errors.tags && <span className="d-block mt-2 text-danger">This field is required</span>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Task</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditTaskForm;
