const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//-------------------------
require("dotenv").config();
// console.log(process.env.DB_URI);
//-----------------------------------
app.use(cors());
//parse 'json' when server sends&recieves 'json'
app.use(express.json());
//importing Todo to access the Schema for Mongoose from todo.model.js
let Todo = require("./todo.model");
//-------------------------------
const PORT = 4000;
//------------------------------------
//MongoDB
const uri = process.env.DB_URI || "mongodb://localhost:27017/todos";
//calling mongoose to connect to 'todos' DB & config objects
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB connected");
});
//============
//Routes:
//POST a new todo on DB:
app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    todo.sorting = await Todo.estimatedDocumentCount();
    // console.log(todo.sorting);
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err);
  }
});
//GET all todos:
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.log(error);
  }
});
//GET completed todos :
app.get("/todos/completed", async (req, res) => {
  try {
    const completed = await Todo.find({ isCompleted: true });
    // console.log(completed);
    res.json({ completed: completed });
  } catch (error) {
    console.log(error);
  }
});
//UPDATE one todo:
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});
//Update todos:
app.put("/todos", async (req, res) => {
  const todosIds = req.body;
  // console.log(`todosIds:`, todosIds); //Array of strings of _id
  //   let etr = todosIds.entries();
  // console.log(`todosIds.entries()`, etr); // =>
  //Array of objects {i _id}: i===sorting, _id=>todo's _id
  for (const [i, id] of todosIds.entries()) {
    await Todo.updateOne({ _id: id }, { sorting: i });
    // console.log(i, id);
  }
  const todos = await Todo.find();
  // console.log(todos);
  // res.json("The list was ordered!");
  res.json(todos);
});
//DELETE one todo:
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json("Todo deleted!");
  } catch (error) {
    console.log(error);
  }
});
//DELETE many todos
app.delete("/todos", async (req, res) => {
  const result = await Todo.deleteMany({ isCompleted: true })
    .then(function () {
      console.log("Completed Todos deleted");
    })
    .catch(function (error) {
      console.log(error);
    });

  res.json("Completed Todos deleted!");
});

//-----------------------------------------
//=========================================
app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
});
