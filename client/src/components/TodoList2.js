import React from "react";
//context
import { useGlobalContext } from "../context";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";
import cross from "./../assets/images/icon-cross.svg";

const SortableItem = SortableElement(({ todo }) => {
  const { toggleComplete, handleDelete, mood } = useGlobalContext();
  //   console.log(`TodoList2 todo: ${todo.todo}, ${todo.isCompleted}, ${todo._id}`);
  return (
    <li>
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
      <Todo todo={todo} mood={mood} />

      <button
        data-title="Delete todo?"
        className="cross"
        //
        onClick={() => handleDelete(todo._id)}
      >
        <img src={cross} />
      </button>
    </li>
  );
});

const SortableList = SortableContainer(({ items }) => {
  const { handleDelete, toggleComplete } = useGlobalContext();
  //   console.log(items);
  let itemsReversed = [...items].reverse();
  return (
    <ul className="list-group">
      {/* {itemsReversed.map((todo, index) => ( */}
      {items.map((todo, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          todo={todo}
          onClick={handleDelete}
          onChange={toggleComplete}
        />
      ))}
    </ul>
  );
});

const TodoList2 = () => {
  const {
    todo,
    setTodo,
    todos,
    setTodos,
    mood,
    setMood,
    filter,
    setFilter,
    filters,
    filtersNames,
    getTodos,
    toggleComplete,
    handleDelete,
    clearCompleted,
    itemsLeft,
    onSortEnd,
    filterList,
    switchMood,
  } = useGlobalContext();
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <div className="container">
        <nav>
          <h1>TODO</h1>
          <button className="switcher" onClick={switchMood}>
            <img src={mood === "dark" ? sun : moon} />
          </button>
        </nav>
        {/*NB!send todos+setTodos to Form for 'todos' instant update*/}
        <Form todos={todos} mood={mood} setTodos={setTodos} />
        <ul className={`filter filter-${mood} input-${mood}`}>
          <li>{itemsLeft} items left</li>
          {/*Filters (5) */}
          <li className="filter-list">{filterList}</li>
          <li>
            <button className="filter-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          </li>
        </ul>

        <section className="list">
          <SortableList
            //
            // pressDelay={250}
            items={todos}
            onSortEnd={onSortEnd}
            onClick={handleDelete}
            onChange={toggleComplete}
            distance={1}
            lockAxis="y"
          />
          {/* {allTodos} */}
        </section>
      </div>
    </main>
  );
};

export default TodoList2;
