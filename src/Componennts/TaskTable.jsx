import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:4200/todolist";
const TaskTable = () => {
const navigate = useNavigate()
  const [data, setData] = useState([]);
  const tbdata = async () => {
    const response = await axios.get(URL);
    setData(response.data);
  };


  const itemDelete = async(id)=>{
    await axios.delete(`${URL}/${id}`).then(()=>{
      console.log('delete Successfully');
      tbdata()
    }).catch((error)=>console.log(error.message))
  }

  const itemEdit = (id)=>{
    navigate('/editForm')
  }

  // const itemEdit = async(id)=>{
  //   await axios.get(`http://localhost:4200/todolist/${id}`).then(()=>{
      
  //     tbdata()
  //   }).catch((error)=>console.log(error.message))
  // }



  useEffect(() => {
    tbdata()
  }, []);

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
            {/* <th scope="col">Created Date</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Completion Date</th> */}
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
                  <td>{item.status}</td>
                  <td>{item.pname}</td>
                  <td>{item.tags}</td>
                  
                  {/* <td></td>
                  <td></td>
                  <td></td> */}
                  <td>{item.priority}</td>
                  <td>
                    <button className="btn btn-outline-danger mb-2 d-block" id={item.id} onClick={()=>itemDelete(item.id)}>
                    <i class="bi bi-trash"></i> Delete
                    </button>
                    <button className="btn btn-primary mb-2 d-block" id={item.id} onClick={()=>itemEdit(item.id)}>
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
