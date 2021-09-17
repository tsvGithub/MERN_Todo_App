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

//=============================
//THEME (1)
//localStorage for user preferences
//Application=>localStorage: key-value
const getStorageTheme = () => {
  let mood = "dark";
  //'mood'=>key; if the kye exists
  //set 'value' to the value that was passed
  if (localStorage.getItem("mood")) {
    mood = localStorage.getItem("mood");
  }
  //return default value or value of the key from localStorage.
  return mood;
};

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
  //THEME (2):
  // const [mood, setMood] = useState("dark");
  //theme state with user preferences
  const [mood, setMood] = useState(getStorageTheme());

  //-------------------------

  //=======================
  //Form:
  const changeForm = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value, checked, type } = e.target;
    type === "checkbox" ? setTodo({ ...todo, [name]: checked }) : setTodo({ ...todo, [name]: value });
    setTodo({
      ...todo,
      [name]: value,
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (todo.todo) {
      const todoFromInput = JSON.stringify({
        todo: todo.todo,
      });
      const res = await axios.post("/todos", todoFromInput, {
        headers: { "Content-Type": "application/json" },
      });
      //for instant update!
      setTodos([...todos, todo]);
      //clear state
      setTodo({ todo: "", isCompleted: false });
      //   console.log(res.data);
    }
    const res = await axios.get("/todos");
    // console.log(res);
    setTodos(res.data.todos);
  };
  //=========================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    // console.log(`getTodos context 'res': ${res}`); //ok all infos
    const tasks = await res.data.todos;
    // console.log(tasks); //ok [todos]
    tasks.sort((a, b) => (a.sorting > b.sorting ? 1 : b.sorting > a.sorting ? -1 : 0));
    // console.log(tasks);
    setTodos(tasks);
  };
  const displayTodos = async () => {
    const res = await axios.get("/todos");
    const tasks = await res.data.todos;
    // console.log(tasks.reverse()); //ok reversed [todos]

    // tasks.sort((a, b) => b._id - a._id);
    // tasks.sort((a, b) => a._id - b._id);
    setTodos(tasks);
  };
  useEffect(() => {
    getTodos();
  }, [todo, setTodo]);

  useEffect(() => {
    displayTodos();
  }, [todo]);
  //--------------

  const toggleComplete = async (todo) => {
    let newTodo = { ...todo };
    newTodo.isCompleted = !todo.isCompleted;
    const res = await axios.put(`/todos/${newTodo._id}`, newTodo);
    // console.log("toggle complete res.data");
    // console.log(res.data); //???
    // setTodo(res.data);
    setTodo(newTodo);
    //clear input
    setTodo({ todo: "" });
    // getTodos();
  };
  //---------------
  //Sortable:
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    // console.log(todos);
    let tasksCopy = [...todos];
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    setTodos(tasksCopy);
    // console.log(tasksCopy);
    const tasksIds = tasksCopy.map((t) => t._id);
    // console.log(tasksIds);
    const res = await axios.put(`/todos`, tasksIds);
    console.log(`onSortEnd 'res'`); // Obj,obj
    console.log(res); //
    // let newTodos = res.data.todos;
    let newTodos = res.data;
    // console.log(newTodos);
    setTodos(newTodos);
    getTodos();
  };
  //-----------------
  //Delete One Todo:
  const handleDelete = async (_id) => {
    // console.log(_id);
    const tasks = todos.filter((todo) => todo._id !== _id);
    setTodos(tasks);
    const res = await axios.delete(`/todos/${_id}`);
    // console.log(res);
    // console.log(todos);
  };
  //Delete completed Todos:
  const clearCompleted = async () => {
    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    // console.log(activeTodos);
    setTodos(activeTodos);
    await axios.delete("/todos");
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
      {name}
    </button>
  ));
  //---------------
  //THEME (3):
  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
  };
  //THEME (4):
  //run every time 'mood' changes
  useEffect(() => {
    //access HTML document & 'class' and set mood
    document.documentElement.className = mood;
    //every time 'mood' changes value => set
    //localStorage to this value.
    localStorage.setItem("mood", mood);
  }, [mood]);

  //====================

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
        displayTodos,
        toggleComplete,
        handleDelete,
        clearCompleted,
        itemsLeft,
        onSortEnd,
        filterList,
        switchMood,
        changeForm,
        submitForm,
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
