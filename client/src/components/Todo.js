import React from "react";

const Todo = ({ todo, mood }) => {
  // console.log(mood);
  return (
    <div key={todo.todo} className={todo.isCompleted ? `line-through line-through-${mood}` : ""}>
      <span>{todo.todo}</span>
      {/* <span> {todo.sorting}</span> */}
    </div>
  );
};

export default Todo;
