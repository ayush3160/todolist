import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import ToDo from "./components/ToDo";

export default function App() {

    const [login,setLogin] = useState(0);
    
    const handleLogin = () => {
      setLogin(login+1)
    }

    return(<> 
      <Router>
      <Navbar login = {login} />
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/home" element = {<ToDo/>}/>
          <Route path = "/login" element = {<Login handleLogin={handleLogin}/>}/>
          <Route path = "/register" element = {<Register/>}/>
        </Routes>
      </Router>
      </>
    )
  }
