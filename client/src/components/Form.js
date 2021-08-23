import React, { useState } from "react";
// import Todo from "./Todo";
import axios from "axios";
const Form = ({ todos, setTodos }) => {
  const [todo, setTodo] = useState({
    todo: "",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodo({
      ...todo,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.todo) {
      const todoFromInput = JSON.stringify({
        todo: todo.todo,
      });
      const res = await axios.post("/todos", todoFromInput, {
        headers: { "Content-Type": "application/json" },
      });

      //NB!!!todos+setTodos come from TodoList.js
      //as it cause instant update!
      setTodos([...todos, todo]);
      //clear state
      setTodo({ todo: "", isCompleted: false });
      console.log(res.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          value={todo.todo}
          onChange={handleChange}
          required
          placeholder="Please Enter Todo"
        />
      </form>
    </>
  );
};

export default Form;