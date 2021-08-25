import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  console.log(todos);
  const [isCompleted, setIsCompleted] = useState(false);
  //theme:
  const [mood, setMood] = useState("dark");
  //=======================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    console.log(res);
    setTodos(res.data.todos);
  };
  useEffect(() => {
    getTodos();
  }, []);

  // const handleCheck = (index) => {
  //   // const { name, checked } = e.target;
  //   todos.filter();

  //   setIsCompleted(isCompleted === false ? true : false);
  // };

  const allTodos =
    todos.length > 0 &&
    todos.map((todo, index) => {
      return (
        <li key={index}>
          <input
            type="checkbox"
            //state
            name="isCompleted"
            checked={isCompleted}
            // onChange={() => handleCheck(index)}
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
        {/*NB!send todos+setTodos for instant update*/}
        <Form todos={todos} setTodos={setTodos} />
        <section className="list">{allTodos}</section>
      </div>
    </main>
  );
};

export default TodoList;
