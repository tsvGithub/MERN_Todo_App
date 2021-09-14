import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { arrayMove } from "react-sortable-hoc";
// import { arrayMove } from "array-move";

const AppContext = React.createContext();

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
//==============================================

//II. (I.App.js + III. TodoList.js)
//all logic is here
const AppProvider = ({ children }) => {
  //State:
  const [todo, setTodo] = useState({
    // todo: "",
    // isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  //FILTERS (2) 'All' filter applies for initial state
  const [filter, setFilter] = useState("All");
  //theme:
  const [mood, setMood] = useState("dark");
  //-------------------------

  //functions
  //=======================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    // console.log(res); //ok all infos
    const tasks = await res.data.todos;
    // console.log(tasks); //ok [todos]
    tasks.sort((a, b) => (a.sorting > b.sorting ? 1 : b.sorting > a.sorting ? -1 : 0));
    setTodos(tasks);
  };

  //   useEffect(() => {
  //     getTodos();
  //   }, [todo, setTodo]);
  //--------------
  const toggleComplete = async (todo) => {
    // console.log(todo);
    console.log(`Hello ${todo.isCompleted} from ToggleComplete!`);
    let newTodo = { ...todo };
    // console.log(newTodo);
    newTodo.isCompleted = !todo.isCompleted;
    // console.log(newTodo);
    const res = await axios.put(`/todos/${newTodo._id}`, newTodo);
    // console.log(res);
    setTodo(newTodo);
  };
  //---------------
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    // console.log(todos);
    let tasksCopy = [...todos];
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    setTodos(tasksCopy);
    // console.log(tasksCopy);
    const tasksIds = tasksCopy.map((t) => t._id);
    // console.log(tasksIds);
    const res = await axios.put(`/todos`, tasksIds);
    console.log(`onSortEnd 'res': ${res}`); // Obj,obj
    getTodos();
  };
  //-----------------

  const handleDelete = async (_id) => {
    console.log("Handle delete");
    console.log(_id);
    const tasks = todos.filter((todo) => todo._id !== _id);
    setTodos(tasks);
    const res = await axios.delete(`/todos/${_id}`);
    console.log(res);
    console.log(todos);
  };
  const getCompleted = async () => {
    const res = await axios.delete("/todos");
    // console.log(res);
  };
  const clearCompleted = () => {
    console.log("Clear completed!");
    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    // console.log(activeTodos);
    setTodos(activeTodos);
    getCompleted();
  };
  //-------------
  //FILTERS (6)
  const itemsLeft = todos.filter(filters["Active"]).length;
  //----------------
  //FILTER (3)
  const filterList = filtersNames.map((name) => (
    //filters
    <button
      className={filter === name ? "current filter-btn" : "filter-btn"}
      onClick={() => setFilter(name)}
      aria-pressed={name === filter}
    >
      {/* <button className="filter-btn " onClick={() => setFilter(name)} aria-pressed={name === filter}> */}
      {name}
    </button>
  ));
  //---------------
  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    // console.log(mood);
  };
  useEffect(() => {
    getTodos();
  }, [todo, setTodo]);

  //====================

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
          //  onClick={() => handleDelete(todo._id)}
        >
          {/* <button onClick={() => handleDelete(id)}> */}
          {/* <img src={cross} /> */}
        </button>
      </li>
    );
  });
  // console.log(todos);
  return (
    <AppContext.Provider
      value={{
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
        getCompleted,
        toggleComplete,
        handleDelete,
        clearCompleted,
        itemsLeft,
        onSortEnd,
        filterList,
        switchMood,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
