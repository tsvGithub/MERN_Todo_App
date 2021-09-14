import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import TodoList from "./components/TodoList";
import TodoList2 from "./components/TodoList2";
import { AppProvider } from "./context";
import "./App.css";

//I-> II. context.js
function App() {
  return (
    //wrap whole app into AppProvider
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/">
            <TodoList2 />
            {/* <TodoList /> */}
          </Route>
        </Switch>
      </Router>
    </AppProvider>

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
