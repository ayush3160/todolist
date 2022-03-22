import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Plan from "./Plan"
import Navbar from "./components/navbar"
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    value : "",
    Array : []
  }
  
   

  render() {
    const handleInput = (e) =>{
      this.setState({value : e.target.value.toUpperCase()})
    }
  
    const handleAdd = () =>{
      if(this.state.value !== ""){
        const items = [...this.state.Array,this.state.value];
        this.setState({Array : items})
        this.setState({value : ""})
      }
    }

    const handleDelete = id => {
      const oldItems = [...this.state.Array];

      const array = oldItems.filter((value,i) => {
        return i !== id;
      })

      this.setState({Array : array});
    }
    return(
      <div className="container-fluid my-5">
        <h5>By Ayush Sharma</h5>
        <div className="row">
          <div className="col-sm-6 mx-auto text-black shadow-lg p-3">
              <h1 className="text-center">To-Do list</h1>
              <div className="row">
                <div className="col-9">
                  <input type="text" placeholder="Write Plan Here" className="form-control" onChange={handleInput} value={this.state.value} /> 
                </div>
                <div className="col-2">
                  <button className="btn btn-outline-success px-5 fw-bold" onClick={handleAdd}>Add</button>
                </div>
                <div className="container-fluid">
                  <ul className="list-unstyled row m-5">
                    {
                      this.state.Array.map((value,i) =>{
                        return <Plan value={value} key={i} id={i} sendData={handleDelete}/>
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
}
