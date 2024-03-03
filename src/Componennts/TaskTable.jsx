import axios from "axios";
import React, { useEffect, useState } from "react";
const URL = "http://localhost:4200/todolist";
const TaskTable = () => {
  const [data, setData] = useState([]);
  const tbdata = async (item) => {
    const response = await axios.get(URL);
    setData(response.data);
  };

  useEffect(() => {
    tbdata()
  }, []);
  console.log(data);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Tags</th>
            <th scope="col">Created Date</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Completion Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.duedate}</td>
                  <td>{item.Status}</td>
                  <td>{item.pname}</td>
                  <td>{item.Tags}</td>
                  
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{item.priority}</td>
                  <td>
                    <button className="btn btn-primary">
                      Delete <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="btn btn-primary">
                      Edit <i className="far fa-edit"></i>
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
