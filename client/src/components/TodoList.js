import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";
import cross from "./../assets/images/icon-cross.svg";

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
  }, [todo, setTodo]);

  const toggleComplete = async (todo) => {
    console.log(todo);
    let newTodo = { ...todo };
    console.log(newTodo);
    newTodo.isCompleted = !todo.isCompleted;
    console.log(newTodo);

    // const res = await axios.put("/todos/" + newTodo._id, newTodo);
    const res = await axios.put(`/todos/${newTodo._id}`, newTodo);
    console.log(res);
    setTodo(newTodo);
  };

  const handleDelete = async (_id) => {
    console.log(_id);
    const tasks = todos.filter((todo) => todo._id !== _id);
    setTodos(tasks);
    const res = await axios.delete("/todos/" + _id);
    console.log(res);
    console.log(todos);
  };

  //============
  let todosReversed = [...todos].reverse();
  // console.log(todosReversed);
  const allTodos =
    todosReversed.length > 0 &&
    todosReversed.map((todo, id) => {
      console.log(todo);
      return (
        <li key={id}>
          <label className="task" data-title="Todo completed?">
            <input
              type="checkbox"
              //state
              name="isCompleted"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo)}
              //too many rerenders:
              // onChange={handleComplete(id)}
            />
            <span className="checkmark"></span>
          </label>
          <Todo todo={todo} />
          <button data-title="Delete todo?" className="cross" onClick={() => handleDelete(todo._id)}>
            {/* <button onClick={() => handleDelete(id)}> */}
            <img src={cross} />
          </button>
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
