import React from "react";

const Todo = ({ todo, mood }) => {
  console.log(mood);
  return <div className={todo.isCompleted ? `line-through line-through-${mood}` : ""}>{todo.todo}</div>;
};

export default Todo;
