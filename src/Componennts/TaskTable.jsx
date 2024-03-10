import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const URL = "https://interview-test-project.glitch.me/todolist";
const TaskTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const tbdata = async () => {
    const response = await axios.get(URL);
    setData(response.data);
  };

  const itemDelete = async (id) => {
    await axios
      .delete(`${URL}/${id}`)
      .then(() => {
        toast.success("Deleted Successfully")
        tbdata();
      })
      .catch((error) => console.log(error.message));
  };



  const filterTasks = (tasks) => {
    let filteredTasks = tasks;
    if (statusFilter) {
        filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }
    if (priorityFilter) {
        filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(task =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }
  console.log(filteredTasks)
    return filteredTasks;
}
  const itemEdit = async (id) => {
    navigate(`/editForm/${id}`)
  };

 
  useEffect(() => {
    tbdata();
  }, []);
  return (
    <>

{/*     
      <div className="filters row mb-4">
       
        <div className="col-sm-4 col-12">
          <label>Status:</label>
          <select className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="in progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-sm-4 col-12">
          <label>Priority:</label>
          <select className="form-control"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="col-sm-4 col-12">
          <label>Search:</label>
          <input
            className="form-control"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title"
          />
        </div>
      </div> */}
<div className="filters row mb-4">
<div className="col-sm-4 col-12">
                <label>Search:</label>
                <input className="form-control"
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or description"
                />
                </div>
  <div className="col-sm-4 col-12">
                <label>Status:</label>
                <select className="form-control" onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="inprogress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                </div>
                <div className="col-sm-4 col-12">
                <label>Priority:</label>
                <select className="form-control"  onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                </div>
         
            </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            {["Id","Title","Description","Due Date","Status","Assigned To","Tags","Priority","Action"].map((item, index) => {
              return (
                <th key={index} scope="col">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filterTasks(data).map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.duedate}</td>
                  <td>{item.status}</td>
                  <td>{item.pname}</td>
                  <td>{item.tags}</td>
                  <td>{item.priority}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-outline-danger mb-2 mx-2 d-block"
                      id={item.id}
                      onClick={() => itemDelete(item.id)}
                    >Delete
                    </button>
                    <button
                      className="btn btn-primary mb-2 d-block"
                      id={item.id}
                      onClick={() => itemEdit(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
