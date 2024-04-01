import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const URL = "https://interview-test-project.glitch.me/todolist";
const TaskTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [statusFltr, setStatusFltr] = useState("");
  const [priorityFltr, setPriorityFltr] = useState("");
  const [searchData, setSearchData] = useState(''); // State for search query
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



  const filteredDatas = (todos) => {
    let filteredDatas = todos;
    if (statusFltr) {
      filteredDatas = filteredDatas.filter(todos => todos.status === statusFltr);
    }
    if (priorityFltr) {
      filteredDatas = filteredDatas.filter(todos => todos.priority === priorityFltr);
    }
    if (searchData) {
      filteredDatas = filteredDatas.filter(todos =>
        todos.title.toLowerCase().includes(searchData.toLowerCase())
      );
    }
    return filteredDatas;
  }

  const itemEdit = async (id) => {
    navigate(`/editForm/${id}`)
  };


  useEffect(() => {
    tbdata();
  }, []);
  return (
    <>
      <div className="filters row mb-4">
        <div className="col-sm-4 col-12">
          <label>Search:</label>
          <input className="form-control"
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search by title"
          />
        </div>
        <div className="col-sm-4 col-12">
          <label>Status:</label>
          <select className="form-control" onChange={(e) => setStatusFltr(e.target.value)}>
            <option value="">All</option>
            <option value="inprogress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-sm-4 col-12">
          <label>Priority:</label>
          <select className="form-control" onChange={(e) => setPriorityFltr(e.target.value)}>
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
            {["Id", "Title", "Description", "Due Date", "Status", "Assigned To", "Tags", "Priority", "Action"].map((item, index) => {
              return (
                <th key={index} scope="col">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredDatas(data).map((item, index) => {
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
          <tr className="text-center">
            {filteredDatas(data).length == 0 && "Data Not found"}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
