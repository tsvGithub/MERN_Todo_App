import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";

import Todo from "./Todo";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  console.log(todos);
  const getTodos = async () => {
    const res = await axios.get("/todos");
    console.log(res);
    setTodos(res.data.todos);
  };
  useEffect(() => {
    getTodos();
  }, []);

  const allTodos =
    todos.length > 0 &&
    todos.map((todo, index) => {
      return (
        <li key={index}>
          <Todo todo={todo} />
        </li>
      );
    });

  return (
    <main className="container">
      <nav>
        <h1>TODO</h1>
        <div className="switcher"></div>
      </nav>
      {/*NB!send todos+setTodos for instant update*/}
      <Form todos={todos} setTodos={setTodos} />
      <section className="list">{allTodos}</section>
    </main>
  );
};

export default TodoList;
