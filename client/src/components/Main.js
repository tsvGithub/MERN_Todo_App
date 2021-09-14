import React, { useState, useEffect } from "react";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import Todo from "./Todo";

import axios from "axios";
// import arrayMove from "array-move";
const SortableItem = SortableElement(({ value }) => {
  return (
    <li className="list-group-item">
      <h1>
        {value.sorting}. {value.todo}
        {/* {value.sorting}. {value.title} */}
      </h1>
      <p>{value.isCompleted}</p>
      {/* <p>{value.description}</p> */}
      <p>{value._id}</p>
    </li>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="list-group">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const SortableComponent = () => {
  //   const [tasks, setTasks] = useState([
  //     { title: "item 1", description: "task one" },
  //     { title: "item 2", description: "task two" },
  //     { title: "item 3", description: "task three" },
  //     { title: "item 4", description: "task four" },
  //     { title: "item 5", description: "task five" },
  //   ]);
  //State:
  const [todo, setTodo] = useState({
    todo: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  // console.log(todos); //- //ok

  const getData = async () => {
    // const res = await fetch("/todos");
    // console.log(res);
    // const tasks = await res.json();
    // console.log(tasks);
    // tasks.sort((a, b) => (a.sorting > b.sorting ? 1 : b.sorting > a.sorting ? -1 : 0));
    // setTodos(tasks);
    //------
    const res = await axios.get("/todos");
    // console.log(res); //ok all infos
    const tasks = await res.data.todos;
    // console.log(tasks); //ok [todos]
    tasks.sort((a, b) => (a.sorting > b.sorting ? 1 : b.sorting > a.sorting ? -1 : 0));
    setTodos(tasks);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    // console.log(todos);
    let tasksCopy = [...todos];
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    setTodos(tasksCopy);
    // console.log(tasksCopy);
    const tasksIds = tasksCopy.map((t) => t._id);
    // console.log(tasksIds);
    const res = await axios.put(`/todos`, tasksIds);
    // console.log(res);
    //   const res = await fetch("/todos", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(tasksIds),
    //   });
    //   const data = await res.json();
    //   console.log(data);
  };

  const allTasks = todos.map((todo, id) => {
    // todosReversed.map((todo, id) => {
    // console.log(todo); //    ok;
    return (
      <li key={id}>
        <label className="task" data-title="Todo completed?">
          <input
            type="checkbox"
            //state
            name="isCompleted"
            // checked={todo.isCompleted}
            // onChange={() => toggleComplete(todo)}
            //too many rerenders:
            // onChange={handleComplete(id)}
          />
          <span className="checkmark"></span>
        </label>

        {todo.todo}

        <button
          data-title="Delete todo?"
          className="cross"
          // onClick={() => handleDelete(todo._id)}
        >
          {/* <button onClick={() => handleDelete(id)}> */}
          {/* <img src={cross} /> */}
        </button>
      </li>
    );
  });
  // console.log(todos);
  return (
    <div>
      <h1>Hello!</h1>
      <SortableList items={todos} onSortEnd={onSortEnd} />

      {/* {allTasks} */}
    </div>
  );
};
function Main() {
  return (
    <div>
      <div>
        <div>
          <SortableComponent />
        </div>
      </div>
    </div>
  );
}

export default Main;
