import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";
import cross from "./../assets/images/icon-cross.svg";

//================================================================
//'filters' object has keys with filters names,
//and values are functions to filter 'todos' data
//array (all/not completed/completed)
const filters = {
  All: () => true,
  Active: (todo) => !todo.isCompleted,
  Completed: (todo) => todo.isCompleted,
};
//collect an array of filters names
const filtersNames = Object.keys(filters);
console.log(filtersNames);
//==============================================

const TodoList = () => {
  //State here:
  const [todo, setTodo] = useState({
    todo: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  //'All' filter applies because all tasks should be shown initially
  const [filter, setFilter] = useState("All");
  //theme:
  const [mood, setMood] = useState("dark");

  //========================
  //=======================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    // console.log(res);
    setTodos(res.data.todos);
  };
  //-------------
  useEffect(() => {
    getTodos();
  }, [todo, setTodo]);
  //--------------
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
  //---------------
  const handleDelete = async (_id) => {
    console.log(_id);
    const tasks = todos.filter((todo) => todo._id !== _id);
    setTodos(tasks);
    const res = await axios.delete("/todos/" + _id);
    console.log(res);
    console.log(todos);
  };
  //-----------------
  let todosReversed = [...todos].reverse();
  // console.log(todosReversed);
  const allTodos =
    todosReversed.length > 0 &&
    todosReversed.filter(filters[filter]).map((todo, id) => {
      // todosReversed.map((todo, id) => {
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
  //----------------
  //Filter:
  const filterList = filtersNames.map((name) => (
    //filters
    <button
      //
      className="filter"
      onClick={() => setFilter(name)}
      // aria-pressed={name === filter}
    >
      {name}
    </button>
  ));

  //---------------
  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    console.log(mood);
  };

  //====================
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
        <ul>
          <li>{filterList}</li>
        </ul>

        <section className="list">{allTodos}</section>
      </div>
    </main>
  );
};

export default TodoList;
