import React, { Component } from "react";
//2
import { Link } from "react-router-dom";
import axios from "axios";

// 7 Todo React functional Component
const Todo = (props) => (
  //[props.todo] = props from todoList() function with Component
  //<Todo todo={currentTodo}/> => [props.todo]==currentTodo
  //=>props.todo.todo_description === currentTodo[todo_description]
  <tr>
    {/*8 if 'completed'(true/false) => applies css.completed or (if not completed) empty string =>no classes applied  */}

    <td className={props.todo.todo_completed ? "completed" : ""}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? "completed" : ""}>{props.todo.todo_responsible}</td>
    <td className={props.todo.todo_completed ? "completed" : ""}>{props.todo.todo_priority}</td>
    <td>
      {/* Actions column with Link to route 'edit' with ID from DB*/}
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
      {/*-------------------- */} |
      <a
        href="#"
        onClick={() => {
          // debugger;
          props.deleteTodo(props.todo._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

//1 export for App.js Route path
export default class TodoList extends Component {
  //3 constructor taking props from the Component
  constructor(props) {
    //calling a parent Constructor & passing in props
    super(props);
    //-----------------------
    this.deleteTodo = this.deleteTodo.bind(this);
    //-------------------
    //setting initial State of the Component
    //with property 'todos' with empty Array
    this.state = { todos: [] };
  }
  //---------------------------------------
  //4 to initialize todos state property (from above  this.state = { todos: [] };)
  //with todos from the DB
  componentDidMount() {
    //sends a request to back-end part
    axios
      .get("http://localhost:4000/todos/")
      //& recieves todo items
      .then((response) => {
        //sets the STATE with data
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //---------------------------------
  //9 updates Todos List instantly without reload page
  // componentDidUpdate() {
  //   axios
  //     .get("http://localhost:4000/todos/")
  //     .then((response) => {
  //       this.setState({ todos: response.data });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  //--------------------------
  deleteTodo(id) {
    debugger;
    axios.delete("http://localhost:4000/todos/" + id).then((response) => {
      console.log(response.data);
    });
    this.setState({
      todos: this.state.todos.filter((el) => el._id !== id),
    });
  }
  //-------------------------------
  //6 iterate over Todo items
  todoList() {
    // debugger;
    return this.state.todos.map((currentTodo) => {
      // Todo Component from 7 with props 'todo'
      return <Todo todo={currentTodo} deleteTodo={this.deleteTodo} key={currentTodo._id} />;
    });
  }
  //----------------------------------------
  render() {
    return (
      <div>
        {/*5 JSX component */}
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/*output of the todoList (6) todo data row by row */}
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
