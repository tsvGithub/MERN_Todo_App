import React from "react";
//
import { useGlobalContext } from "../context";

import Form from "./Form";
// import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";
// import cross from "./../assets/images/icon-cross.svg";

const TodoList3 = () => {
  const {
    // todo,
    // setTodo,
    todos,
    setTodos,
    mood,
    allTodos,
    // setMood,
    // filter,
    // setFilter,
    // filters,
    // filtersNames,
    // getTodos,
    // toggleComplete,
    // handleDelete,
    clearCompleted,
    itemsLeft,
    filterList,
    switchMood,
  } = useGlobalContext();
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <div className="container">
        <nav>
          <h1>TODO</h1>
          <button className="switcher" onClick={switchMood}>
            <img src={mood === "dark" ? sun : moon} alt="mood" />
          </button>
        </nav>
        {/*NB!send todos+setTodos to Form for 'todos' instant update*/}
        <Form todos={todos} mood={mood} setTodos={setTodos} />
        <ul className={`filter filter-${mood} input-${mood}`}>
          <li key="items-left">{itemsLeft} items left</li>
          {/*Filters (5) */}
          <li key="filter-list" className="filter-list">{filterList}</li>
          <li key="filter-completed">
            <button className="filter-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          </li>
        </ul>

        {/* {allTodos} */}
        <ul className="list">{allTodos}</ul>

        {/* <section className="list">{allTodos}</section> */}
      </div>
    </main>
  );
};

export default TodoList3;
