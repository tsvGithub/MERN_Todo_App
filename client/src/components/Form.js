import React from "react";
import { useGlobalContext } from "../context3";
// import { useGlobalContext } from "../context";

const Form = () => {
  const { todo, mood, changeForm, submitForm } = useGlobalContext();
  return (
    <div>
      <form onSubmit={submitForm}>
        <span htmlFor="todo-circle" className={`circle input-${mood} `}>
          <input
            id="todo-circle"
            type="text"
            name="todo"
            value={todo.todo}
            onChange={changeForm}
            required
            className={`input input-${mood}`}
            placeholder="Create a new todo..."
            aria-label="todo"
          />
        </span>
      </form>
    </div>
  );
};

export default Form;
