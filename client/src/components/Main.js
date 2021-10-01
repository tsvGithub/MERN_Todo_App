import React, { useState, useEffect } from "react";
// import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
// import arrayMove from "array-move";

import axios from "axios";

//================================================================
//FILTERS (1)
//(1a)'filters' has keys with filters 'names' (All, Active, Completed),
//and values are functions to filter 'todos' data
//array (all/not completed/completed)
const filters = {
  All: () => true,
  Active: (todo) => !todo.isCompleted,
  Completed: (todo) => todo.isCompleted,
};
//(1b)collect an array of filters 'names' ([All, Active, Completed])
const filtersNames = Object.keys(filters);
// console.log(filtersNames);

const SortableItem = SortableElement(({ value }) => {
  return (
    <li className="list-group-item">
      <h1>
        {value.sorting}. {value.todo}
        {/* {value.sorting}. {value.title} */}
      </h1>
      {/* <p>{value.description}</p> */}
      <p>{value._id}</p>
    </li>
  );
});

const SortableList = SortableContainer(({ items }) => {
  //FILTERS (2) 'All' filter applies for initial state
  const [filter, setFilter] = useState("All");
  // console.log(filter);
  //FILTERS (6)
  const itemsLeft = items.filter(filters["Active"]).length;
  //FILTER (3)
  const filterList = filtersNames.map((name) => (
    //filters
    <button
      key={name}
      className={filter === name ? "current filter-btn" : "filter-btn"}
      onClick={() => setFilter(name)}
      aria-pressed={name === filter}
    >
      {name}
    </button>
  ));
  return (
    <div>
      {/*========================FILTER============================= */}
      <ul>
        <li key="items-left">{itemsLeft} items left</li>
        {/*Filters (5) */}
        <li key="filter-list" className="filter-list">
          {filterList}
        </li>
        <li key="filter-completed">
          <button className="filter-btn">Clear completed</button>
        </li>
      </ul>

      <ul className="list-group">
        {/* //FILTERS (4) set filters .filter(filters[filter]) for each item*/}
        {items.filter(filters[filter]).map((value, index) => (
          // {items.map((value, index) => (
          // {items.reverse().map((value, index) => ( //NB!!! reverse() with Sortable doesn't work!!!
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ul>
    </div>
  );
});

const SortableComponent = () => {
  //for local test use this State [tasks] =>
  //   const [tasks, setTasks] = useState([
  //     { title: "item 1", description: "task one" },
  //     { title: "item 2", description: "task two" },
  //     { title: "item 3", description: "task three" },
  //     { title: "item 4", description: "task four" },
  //     { title: "item 5", description: "task five" },
  //   ]);
  //or this State for todo DB:
  const [todo, setTodo] = useState({
    todo: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  // console.log(todos); //- //ok
  //======================
  const getData = async () => {
    const res = await axios.get("/todos");
    // console.log(res); //ok all infos
    const tasks = await res.data.todos;
    // console.log(`tasks`, tasks);
    // let tasksReversed = await tasks.reverse(); //ne rabotaet!
    // console.log(`tasks reversed`, tasksReversed);
    tasks.sort((a, b) => (a.sorting > b.sorting ? 1 : b.sorting > a.sorting ? -1 : 0));
    setTodos(tasks);
  };
  useEffect(() => {
    getData();
  }, []);

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    // console.log(todos);
    let tasksCopy = [...todos];
    // tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    // tasksCopy.reverse(); //lomaetsja
    tasksCopy = arrayMoveImmutable(tasksCopy, oldIndex, newIndex);

    setTodos(tasksCopy);
    console.log(`tasksCopy`, tasksCopy);
    const tasksIds = tasksCopy.map((t) => t._id);
    // console.log(tasksIds);
    const res = await axios.put(`/todos`, tasksIds);
    console.log(res);
    getData();
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
  return <SortableComponent />;
}

export default Main;
