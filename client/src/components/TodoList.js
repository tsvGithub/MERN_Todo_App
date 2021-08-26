import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";

const TodoList = () => {
  const [todo, setTodo] = useState({
    todo: "",
    isCompleted: false,
  });

  const [todos, setTodos] = useState([]);
  // console.log(todos);
  //theme:
  const [mood, setMood] = useState("dark");
  //=======================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    // console.log(res);
    setTodos(res.data.todos);
  };
  useEffect(() => {
    getTodos();
  }, [todo]);

  const toggleComplete = async (todo) => {
    // console.log(todo);
    let newTodo = { ...todo };
    // console.log(newTodo);
    newTodo.isCompleted = !todo.isCompleted;
    // console.log(newTodo);

    const res = await axios.put("/todos/" + newTodo._id, newTodo);
    console.log(res);
    setTodo(newTodo);
  };
  //============
  const allTodos =
    todos.length > 0 &&
    todos.map((todo, id) => {
      return (
        <li key={id}>
          <input
            type="checkbox"
            //state
            name="isCompleted"
            checked={todo.isCompleted}
            onChange={() => toggleComplete(todo)}
            //too many rerenders:
            // onChange={handleComplete(id)}
          />
          <Todo todo={todo} />
        </li>
      );
    });

  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    console.log(mood);
  };

  return (
    <main className="wrapper">
      <div className="container">
        <nav>
          <h1>TODO</h1>
          <button className="switcher" onClick={switchMood}>
            <img src={mood === "dark" ? moon : sun} />
          </button>
        </nav>
        {/*NB!send todos+setTodos to Form for 'todos' instant update*/}
        <Form todos={todos} setTodos={setTodos} />
        <section className="list">{allTodos}</section>
      </div>
    </main>
  );
};

export default TodoList;
