import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TodoList3 from "./components/TodoList3";
// eslint-disable-next-line
import Main from "./components/Main";
import { AppProvider } from "./context3";
import "./App.css";

//I-> II. context.js
function App() {
  return (
    //wrap whole app into AppProvider
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/">
            <TodoList3 />
            {/* <Main /> */}
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
