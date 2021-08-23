import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import CreateTodo from "./components/create-todo.component";
// import EditTodo from "./components/edit-todo.component";
// import TodosList from "./components/todo-list.component";

// import TodosList from "./components/TodoList";

// import logo from "./logo.png";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  return (
    <Router>
      <main classname="App">
        <Switch>
          <Route path="/">
            <TodoList />
          </Route>

          {/* <Route path="/">
            <TodoList />
          </Route> */}
        </Switch>
      </main>
    </Router>
    //Router from BrowserRouter
    // <Router>
    //   <div className="container">
    //     <nav className="navbar">
    //       <a href="https://github.com/tsvGithub" target="_blank" rel="noopener noreferrer">
    //         {/* <img src={logo} alt="Just Do It!" /> */}
    //       </a>
    //       {/*Links==='a'*/}
    //       <Link to="/" className="navbar-brand">
    //         Todos
    //       </Link>
    //       <ul>
    //         <li>
    //           <Link to="/">Todos</Link>
    //         </li>
    //         <li>
    //           <Link to="/create">Create Todo</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     {/*ROUTES for each Route & it have at least 2 attributes - path and component to connect to*/}
    //     <Route path="/" exact component={TodosList} />
    //     <Route path="/edit/:id" component={EditTodo} />
    //     <Route path="/create" component={CreateTodo} />
    //   </div>
    // </Router>
  );
}

export default App;
