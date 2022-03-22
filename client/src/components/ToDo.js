import React from "react";
import {useState,useEffect} from "react"
import {decode as atob} from 'base-64'
import { useNavigate } from "react-router";
import Plan from "./Plan";

export default function ToDo(){

    let navigate = useNavigate();

    const [item,setItem] = useState("");

    const [todo,setToDo] = useState([]);

    const [id,setId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token')
    if(token){
    const user = JSON.parse(atob(token.split('.')[1]));
      if(!user){
        localStorage.removeItem('token')
        console.log(user,"Yo it is not user")
        navigate("/login")
      }else{
        fetch("/getList",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({id : user.id})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setToDo(data.todo);
        })
        setId(user.id)
      }
    }else{
        alert("You Are not logged In")
        navigate("/login")
    }    
    },[])

    const handleAdd = () => {
        fetch("/add-item",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({id : id,item : item})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setToDo(data.todo);
        })
        setItem("")
    }

    const handleDelete = (value) => {
        fetch("/delete-item",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({id : id,item : value})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setToDo(data.todo);
        })
    }


    return(
        <div className="container-fluid">
        <br/>
        <br/>    
        <div className="row">
          <div className="col-sm-6 mx-auto text-black shadow-lg p-3">
              <h1 className="text-center">To-Do list</h1>
              <div className="row">
                <div className="col-9">
                  <input type="text" placeholder="Write Plan Here" className="form-control" value={item} onChange={(e) => {setItem(e.target.value)}}/> 
                </div>
                <div className="col-2">
                  <button className="btn btn-outline-success px-5 fw-bold" onClick={handleAdd}>Add</button>
                </div>
                <div className="container-fluid">
                  <ul className="list-unstyled row m-5">
                    {
                      todo.map((value,i) =>{
                        return <Plan value={value} key={i} id={i} handleDelete = {handleDelete}/>
                      })
                    }
                  </ul>
                </div>
              </div>
          </div>
        </div>
        </div>
    )
}