import React, { Component } from "react";
import axios from "axios";

//exprt to App.js Route path
export default class CreateList extends Component {
  constructor(props) {
    //1. calls parents constructor & passing in props
    super(props);
    //---------------------------------------------
    //7.BIND to '.this' all Methods because of accessing to the STATE Object within of all Methods
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // 2  ---------------------------------------------------
    //State Object for CreateList component with default values
    //if you need you can add many more properties
    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false,
    };
  }
  // 3 -------------------------------------------
  //METHODS for FORM to update STATE with new values
  //Methods take (e)events as parameters &
  onChangeTodoDescription(e) {
    this.setState({
      //call State to update key-value parametrs with new
      description: e.target.value,
    });
  }
  onChangeTodoResponsible(e) {
    this.setState({
      responsible: e.target.value,
    });
  }
  onChangeTodoPriority(e) {
    this.setState({
      priority: e.target.value,
    });
  }

  //onSubmit is called when user submits the form
  onSubmit(e) {
    // 4
    e.preventDefault();
    // 6 ----------------------------------------
    //Console.log all Values from CreateList Component STATE
    //  ${this.state.+ key}
    console.log(`Form submited:`);
    console.log(`Todo Description: ${this.state.description}`);
    console.log(`Todo Responsible: ${this.state.responsible}`);
    console.log(`Todo Priority: ${this.state.priority}`);
    console.log(`Todo Completed: ${this.state.completed}`);
    //----------------------------------------
    //9 create new Todo item with value coming from form &
    //send it over HTTP post request to the back-end part
    const newTodo = {
      description: this.state.description,
      responsible: this.state.responsible,
      priority: this.state.priority,
      completed: this.state.completed,
    };
    //9a call Axios with method POST & with 2 args:
    //back-end URL end-point & object newTodo
    //
    axios.post("http://localhost:4000/todos/", newTodo).then((res) => console.log(res.data));
    //----------------------------------------
    //5 reset STATE  once the form is submitted to initial STATE
    this.setState({
      description: "",
      responsible: "",
      priority: "",
      completed: false,
    });

    //After the form is submitted, the location is updated
    //so the user is taken back to the home page
    window.location = "/";
  }
  //------------------------------------------------------

  //Create Todo Form
  render() {
    // 8 FORM
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Todo</h3>
        {/*Setting onSubmit property (attribute) to {this.onSubmit} 
        from //4 Methods for Form... & BIND to 'this.onSubmit' //7  */}
        <form onSubmit={this.onSubmit}>
          {/*Description: set Value attribute to corresponding STATE property & onCanhge event will update STATE */}
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          {/*Responsible: set Value attribute to corresponding STATE property & onCanhge event will update STATE */}
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.responsible}
              onChange={this.onChangeTodoResponsible}
            />
            {/*Priority: set Value attribute to corresponding STATE property & onCanhge event will update STATE */}
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-checked-input"
                  type="radio"
                  name="priorityOptions"
                  id="priorityLow"
                  value="Low"
                  checked={this.state.priority === "Low"}
                  onChange={this.onChangeTodoPriority}
                />
                {/*checked can be compared to Value attribute */}
                <label className="form-check-label">Low</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-checked-input"
                  type="radio"
                  name="priorityOptions"
                  id="priorityMedium"
                  value="Medium"
                  checked={this.state.priority === "Medium"}
                  onChange={this.onChangeTodoPriority}
                />
                <label className="form-check-label">Medium</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-checked-input"
                  type="radio"
                  name="priorityOptions"
                  id="priorityHigh"
                  value="High"
                  checked={this.state.priority === "High"}
                  onChange={this.onChangeTodoPriority}
                />
                <label className="form-check-label">High</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
