import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {decode as atob} from 'base-64'

export default function Navbar(props){

  let navigate = useNavigate();

  var [log, setLog] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      if (!user) {
        localStorage.removeItem("token");
      } else {
        const login = document.getElementById("login");
        const register = document.getElementById("register");
        login.style.display = "none";
        register.style.display = "none";
        const logout = document.getElementById("logout");
        logout.style.display = "block";
      }
    } else {
      const logout = document.getElementById("logout");
      logout.style.display = "none";
      const login = document.getElementById("login");
      const register = document.getElementById("register");
      login.style.display = "block";
      register.style.display = "block";
    }
  }, [log,props.login]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLog(1);
    navigate("/");
  };

    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor : "black"}}>
  <Link class="navbar-brand text-light" to = "/">To-Do</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav  mr-auto">
      <li class="nav-item active">
        <Link class="nav-link text-light" to = "/home">Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link text-light" id = 'login' to = "/login">Login</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link text-light" id='register' to = "/register">Register</Link>
      </li>
      <li class="nav-item">
            <button
              class="nav-link text-light mx-3 btn btn-danger"
              style={{ display: "none" }}
              id="logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
    </ul>
  </div>
</nav>
</>
    )
}