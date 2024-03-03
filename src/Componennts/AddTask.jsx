import React from 'react'
import { useNavigate } from "react-router-dom";
import TaskTable from './TaskTable';
const AddTask = () => {
    const navigate = useNavigate();
    const Adddata = () => {
        navigate('/taskform')
    }
    return (
        <>
            <section className="py-4">
                <div className="container">
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-primary my-4" onClick={Adddata}>Add Task</button>
                    </div>
                    <TaskTable />
                </div>
            </section>
        </>
    )
}

export default AddTask