import React from "react";
//for routes
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import  all components from components folder
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todo-list.component";

import logo from "./logo.png";

function App() {
  return (
    //Router from BrowserRouter
    <Router>
      <div className="container">
        {/*Navigation Bar with Links to access to Routes */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://github.com/tsvGithub" target="_blank" rel="noopener noreferrer">
            <img src={logo} width="50" height="50" alt="Just Do It!" />
          </a>
          {/*Links to Routes */}
          <Link to="/" className="navbar-brand">
            MERN_Stack Todo App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                {/*Links to Route TodosList */}
                <Link to="/" className="nav-link">
                  Todos
                </Link>
              </li>
              <li className="navbar-item">
                {/*Links to Route Create Todo */}
                <Link to="/create" className="nav-link">
                  Create Todo
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/*ROUTES for each Route & it have at least 2 attributes - path and component to connect to*/}
        <Route path="/" exact component={TodosList} /> {/*todo-list.component.js */}
        <Route path="/edit/:id" component={EditTodo} /> {/*edit-list.component.js */}
        <Route path="/create" component={CreateTodo} /> {/*create-list.component.js */}
      </div>
    </Router>
  );
}

export default App;
