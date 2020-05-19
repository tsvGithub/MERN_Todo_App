import React, { Component } from "react";
//2
import axios from "axios";

//1 export to App.js Route path
export default class EditTodo extends Component {
  //3 constructor taking props & call parents constructor
  constructor(props) {
    super(props);
    //-----------------------------
    //9 creates binding to .this for event handlers Methods
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //-----------------------------------------
    //4 set the Component State to initial values
    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false,
    };
  }
  //--------------------------------
  //5 create Component
  componentDidMount() {
    axios
      //get particular todo (by ID)
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then((response) => {
        //response containing the found Todo's data
        //=> set the State for Edit Component
        this.setState({
          description: response.data.description,
          responsible: response.data.responsible,
          priority: response.data.priority,
          completed: response.data.completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //--------------------------------------
  // 7 Methods for form:
  //take as parameter an event (e)
  onChangeTodoDescription(e) {
    this.setState({
      //reset the State to value in corresponding input element
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
  onChangeTodoCompleted(e) {
    this.setState({
      //revert completed from true to false or from false to true
      completed: !this.state.completed,
    });
  }
  //---------------------------------
  //8
  //sends updated todo back-end DB and updates DB
  onSubmit(e) {
    //prevent natural behaviour
    e.preventDefault();
    //define the Object that sends to the back-end (igual to STATE)
    const obj = {
      description: this.state.description,
      responsible: this.state.responsible,
      priority: this.state.priority,
      completed: this.state.completed,
    };
    //put request to.../update/ & obj (see above) with updated info
    axios.put("http://localhost:4000/todos/" + this.props.match.params.id, obj).then((res) => console.log(res.data));
    //after update returns user to the Todos List default route
    //history === browser's history
    this.props.history.push("/");

    //After the form is submitted, the location is updated
    //so the user is taken back to the home page
    window.location = "/";
  }

  render() {
    return (
      <div>
        {/*6 */}
        <h3>Update Todo</h3>
        {/* form with event onSubmit; bind with event handler onSubmit */}
        <form onSubmit={this.onSubmit}>
          {/*value is existing value from DB*/}
          {/* onChange event bind with event handler*/}
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeTodoDescription}
            />
          </div>

          <div className="form-group">
            <label>Responsible:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>

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

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedCheckbox"
                name="completedCheckbox"
                onChange={this.onChangeTodoCompleted}
                checked={this.state.completed}
                value={this.state.completed}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
              </label>
            </div>

            <br />

            <div className="form-group">
              <input type="submit" value="Update Todo" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
