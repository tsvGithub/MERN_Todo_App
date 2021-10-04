import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// //SORTABLE (1)
import { arrayMoveImmutable } from "array-move";
// import { arrayMove } from "react-sortable-hoc";
//----------------------
import useSound from "use-sound";
// import completeSound from "../assets/audio/Good-idea-bell.mp3";
// import deleteSound from "../assets/audio/Low-battery-notify.mp3";
import completeSound from "./assets/audio/Good-idea-bell.mp3";
import deleteSound from "./assets/audio/Low-battery-notify.mp3";

const AppContext = React.createContext();

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

//==============================================
//II. (I.App.js + III. TodoList.js)
const AppProvider = ({ children }) => {
  //State:
  const [todo, setTodo] = useState({
    todo: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  //FILTERS (2) 'All' filter applies for initial state
  const [filter, setFilter] = useState("All");
  //THEME
  const [mood, setMood] = useState(getStorageTheme());
  const [playComplete] = useSound(completeSound);
  const [playDelete] = useSound(deleteSound);

  //=======================
  //Form:
  const changeForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
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
      console.log(res);
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
  //===================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    // console.log(`getTodos context 'res':`, res); //ok all infos
    const tasks = await res.data.todos;
    // console.log(`tasks`, tasks);
    tasks.sort((a, b) => (a.sorting > b.sorting ? 1 : b.sorting > a.sorting ? -1 : 0));
    // console.log(tasks);
    setTodos(tasks);
  };
  useEffect(() => {
    getTodos();
  }, [todo, setTodo]);

  //=========================
  //SORTABLE (3)
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    // console.log(`onSortEnd filter: `, filter); //OK: Active Completed All
    // console.log(`onSortEnd todos: `, todos);
    // console.log(`onSortEnd oldIndex, newIndex: `, oldIndex, newIndex);
    //----------
    //create copy of 'todos' Array:
    // let tasksCopy = [...todos];
    //------------
    //Or conditionally chose between All/Active/Completed
    //This because I wanted different sorting index for All/Active&Completed to be able sort in different Filter
    let completedItems = todos.filter((todo) => todo.isCompleted === true);
    // console.log(completedItems);
    let notCompletedItems = todos.filter((todo) => todo.isCompleted === false);
    // console.log(notCompletedItems);
    let tasksCopy = filter === "All" ? todos : filter === "Active" ? notCompletedItems : completedItems;
    console.log(tasksCopy);
    //----------
    // tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    // tasksCopy.reverse(); //lomaetsja
    tasksCopy = arrayMoveImmutable(tasksCopy, oldIndex, newIndex);

    setTodos(tasksCopy);
    // console.log(`onSortEnd tasksCopy, oldIndex, newIndex:`, tasksCopy, oldIndex, newIndex);
    const tasksIds = tasksCopy.map((t) => t._id);
    // console.log(`onSortEnd tasksIds: `, tasksIds);
    await axios.put(`/todos`, tasksIds);
    // const res = await axios.put(`/todos`, tasksIds);
    // console.log(`onSortEnd res: `, res);
    getTodos();
  };
  //=======================
  const toggleComplete = async (todo) => {
    playComplete();
    let newTodo = { ...todo };
    newTodo.isCompleted = !todo.isCompleted;
    await axios.put(`/todos/${newTodo._id}`, newTodo);
    // const res = await axios.put(`/todos/${newTodo._id}`, newTodo);
    // console.log(res.data); //
    // setTodo(res.data);
    setTodo(newTodo);
    //clear input
    setTodo({ todo: "" });
    getTodos();
  };

  const toggleFilter = (name) => {
    setFilter(name);
    // console.log(`Toggle Filter 'name':`, name);
    //--------------
    let completedItems = todos.filter((todo) => todo.isCompleted === true);
    // console.log(completedItems);
    let notCompletedItems = todos.filter((todo) => todo.isCompleted === false);
    // console.log(notCompletedItems);
    setTodos(name === "All" ? todos : name === "Active" ? notCompletedItems : completedItems);
    getTodos();
  };
  //-----------------
  //Delete One Todo:
  const handleDelete = async (_id) => {
    // console.log(_id);
    playDelete();
    const tasks = todos.filter((todo) => todo._id !== _id);
    setTodos(tasks);
    await axios.delete(`/todos/${_id}`);
    // const res = await axios.delete(`/todos/${_id}`);
    // console.log(res);
    // console.log(todos);
  };
  //Delete completed Todos:
  const clearCompleted = async () => {
    playDelete();

    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    // console.log(activeTodos);
    setTodos(activeTodos);
    await axios.delete("/todos");
  };
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
        toggleFilter,
        filters,
        filtersNames,
        getTodos,
        toggleComplete,
        handleDelete,
        clearCompleted,
        // itemsLeft,
        onSortEnd,
        // filterList,
        switchMood,
        changeForm,
        submitForm,
        // allTodos,
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
