import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Todo from "./Todo";

import moon from "./../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  // console.log(todos);
  const [isCompleted, setIsCompleted] = useState(false);
  //theme:
  const [mood, setMood] = useState("dark");
  //=======================
  const getTodos = async () => {
    const res = await axios.get("/todos");
    // console.log(res);
    setTodos(res.data.todos);
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleComplete = (id) => {
    console.log(id); //0
    // let updatedTodos = todos.map((todo) => {
    //   console.log(todo);//
    //   console.log(todo.id);//
    //   if (todo.id == id) {
    //     return { ...todo, isCompleted: !todo.isCompleted };
    //   }
    //   console.log(todo);
    //   return todo;
    // });
    // setTodos({ todos: updatedTodos });
    //--------------
    setTodos((prevState) => {
      let newTodos = [...prevState];

      // find and change specific item by its index
      // let todo = newTodos[id];
      // console.log(todo._id); //OK _id
      // console.log(todo.isCompleted); //false
      // todo.isCompleted = !todo.isCompleted;
      // console.log(todo.isCompleted); //true
      // console.log(todo);
      // setTodo({
      //   ...todo,
      //   todo,
      //   // isCompleted = !isCompleted
      // });
      // console.log(newTodos);
      // let chanchedList = [{ ...newTodos, todo }];
      // console.log(chanchedList);
      // return chanchedList;
      newTodos[id].isCompleted = !isCompleted;
      return newTodos;
    });
    // const { name, checked } = e.target;

    // setIsCompleted({ [name]: checked });

    console.log(todos);
    // const currentTodo = todos.find((todo, id) => todo.id === id);
    // console.log(currentTodo);

    // setIsCompleted(isCompleted === false ? true : false);
    // console.log(isCompleted);
  };

  const allTodos =
    todos.length > 0 &&
    todos.map((todo, id) => {
      return (
        <li key={id}>
          <input
            type="checkbox"
            //state
            name="isCompleted"
            checked={todo.isCompleted}
            onChange={() => handleComplete(id)}
            // onChange={handleComplete(id)}
          />
          <Todo todo={todo} />
        </li>
      );
    });

  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    console.log(mood);
  };

  return (
    <main className="wrapper">
      <div className="container">
        <nav>
          <h1>TODO</h1>
          <button className="switcher" onClick={switchMood}>
            <img src={mood === "dark" ? moon : sun} />
          </button>
        </nav>
        {/*NB!send todos+setTodos for instant update*/}
        <Form todos={todos} setTodos={setTodos} />
        <section className="list">{allTodos}</section>
      </div>
    </main>
  );
};

export default TodoList;
