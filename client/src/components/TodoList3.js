import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { useGlobalContext } from "../context3";

import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";
import cross from "./../assets/images/icon-cross.svg";

// //================================================================
// //FILTERS (1)
// //(1a)'filters' has keys with filters 'names' (All, Active, Completed),
// //and values are functions to filter 'todos' data
// //array (all/not completed/completed)
// const filters = {
//   All: () => true,
//   Active: (todo) => !todo.isCompleted,
//   Completed: (todo) => todo.isCompleted,
// };
// //(1b)collect an array of filters 'names' ([All, Active, Completed])
// const filtersNames = Object.keys(filters);

const SortableItem = SortableElement(({ todo }) => {
  const { toggleComplete, handleDelete, mood } = useGlobalContext();
  // console.log(`todo: `, todo);
  // console.log(`TodoList3 todo: ${todo.todo}, ${todo.isCompleted}, ${todo._id}`);
  return (
    <li className={`input-${mood}`} key={`item-${todo.todo}`}>
      <label className="task" data-title="Todo completed?">
        <input
          type="checkbox"
          //state
          name="isCompleted"
          checked={todo.isCompleted}
          //------------------
          //Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
          // onClick={() => toggleComplete}
          //----------------------
          onChange={() => toggleComplete(todo)}
          //--------------
          //too many rerenders:
          // onChange={handleComplete(id)}
          aria-label="checkbox"
        />
        <span className="checkmark"></span>
      </label>

      <Todo todo={todo} mood={mood} key={todo.todo} />

      <button
        data-title="Delete todo?"
        className="cross"
        //
        onClick={() => handleDelete(todo._id)}
      >
        <img src={cross} alt="cross" />
      </button>
    </li>
  );
});

const SortableList = SortableContainer(({ items }) => {
  const { filter, filters, filtersNames, toggleFilter, mood, clearCompleted } = useGlobalContext();
  //FILTERS (6)
  const itemsLeft = items.filter(filters["Active"]).length;
  //FILTER (3)
  const filterList = filtersNames.map((name) => {
    // console.log(name);
    return (
      //filters
      <button
        key={`item-${name}`}
        className={filter === name ? "current filter-btn" : "filter-btn"}
        // onClick={() => console.log(name)} //OK
        // onClick={() => setFilter(name)}
        onClick={() => toggleFilter(name)}
        aria-pressed={name === filter}
      >
        {name}
      </button>
    );
  });
  return (
    <div>
      {/*========================FILTER============================= */}
      <ul className={`filter filter-${mood} input-${mood}`}>
        <li key="items-left">{itemsLeft} items left</li>
        {/*Filters (5) */}
        <li key="filter-list" className="filter-list">
          {filterList}
        </li>
        <li key="filter-completed">
          <button className="filter-btn" onClick={clearCompleted}>
            Clear completed
          </button>
        </li>
      </ul>

      <ul className="list-group">
        {/* reverse() with Sortable doesn't work!*/}
        {/* {itemsReversed.map((todo, index) => ( */}
        {/* {items.reverse().map((todo, index) => ( */}
        {/* {items.map((todo, index) => ( */}
        {items.filter(filters[filter]).map((todo, index) => {
          // console.log(filter); //All, Active, Completed
          return (
            <div key={todo._id}>
              <SortableItem key={`item-${todo}`} index={index} todo={todo} />
              {/* with original key={`item-${index}`} Sortable didn't work: */}
              {/* <SortableItem key={`item-${index}`} index={index} todo={todo} /> */}
            </div>
          );
        })}
      </ul>
    </div>
  );
});

const TodoList3 = () => {
  const { todos, setTodos, mood, onSortEnd, switchMood } = useGlobalContext();
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <div className="container">
        <nav>
          <h1>TODO</h1>
          {/*========================THEME=========================== */}
          <button className="switcher" onClick={switchMood}>
            <img src={mood === "dark" ? sun : moon} alt="mood" />
          </button>
        </nav>
        {/*========================FORM=============================== */}
        {/*NB!send todos+setTodos to Form for 'todos' instant update*/}
        <Form todos={todos} mood={mood} setTodos={setTodos} />
        {/*========================TODOS========================= */}
        <section className="list">
          {/* map over todos */}
          <SortableList
            // pressDelay={250}
            items={todos}
            onSortEnd={onSortEnd}
            // onClick={handleDelete}
            // onChange={toggleComplete}
            distance={1}
            // lockAxis="y"
          />
        </section>
        <footer>
          <p className={`footer footer-${mood}`}>Drag and drop to reorder list</p>
        </footer>
      </div>
    </main>
  );
};

export default TodoList3;
