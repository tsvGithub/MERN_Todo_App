import React from "react";

const Todo = ({ todo }) => {
  return <div className={todo.isCompleted ? "line-through" : ""}>{todo.todo}</div>;
};

export default Todo;
