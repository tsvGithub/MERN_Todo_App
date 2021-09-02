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
//-------------------------------------
// //expressRouter for different routes: users, posts, etc
// const todoRoutes = express.Router();
//-----------------
//to connect endpoints & server
//inserting the Router which is attached to URL path "/todos"
//& attach the router -> todoRoutes
// app.use("/todos", todoRoutes);
//------------------------------------
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
//===========\
//============
//Routes:
//client-Form:
//POST a new todo on DB:
app.post("/todos", async (req, res) => {
  try {
    await Todo.create({
      todo: req.body.todo,
      isCompleted: false,
    });
    // console.log(req.body);
    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
});
//GET all todos:
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos: todos });
  } catch (error) {
    console.log(error);
  }
});
app.get("/todos/completed", async (req, res) => {
  try {
    const completed = await Todo.find({ isCompleted: true });
    res.json({ completed: completed });
  } catch (error) {
    console.log(error);
  }
});
//UPDATE one todo:
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body);
    // res.json({ todos: todo });
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
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

// //===============================================
// //CRUD
// //READ
// todoRoutes.route("/").get(function (req, res) {
//   //retrieve all items from DB usind data model Todo
//   Todo.find(function (err, todos) {
//     if (err) {
//       console.log(err);
//     } else {
//       //response with JSON object 'todos object'
//       res.json(todos);
//     }
//   });
// });
// //---------------------------------------
// //retrieve one specific item with id
// todoRoutes.route("/:id").get(function (req, res) {
//   //from URL params.id
//   let id = req.params.id;
//   console.log(req.params.id);
//   Todo.findById(id, function (err, todo) {
//     res.json(todo);
//   });
// });
// //--------------------------------------
// //CREATE
// //adding new todo to DB
// todoRoutes.route("/").post(function (req, res) {
//   //retrieve data from request body based on Todo data model
//   let todo = new Todo(req.body);
//   //save todo to DB and (promise) .then
//   todo
//     .save()
//     .then((todo) => {
//       //if OK, return JSON Object {{}}
//       res.status(200).json({ todo: "todo added successfully" });
//     })
//     //or catch error
//     .catch((err) => {
//       res.status(400).send("adding new todo failed");
//     });
// });
// //--------------------------------------------------------
// //UPDATE
// //update route, for example, completed specific item
// todoRoutes.route("/:id").put(function (req, res) {
//   //retrieve todo item from DB using id
//   Todo.findById(req.params.id, function (err, todo) {
//     //if todo doesn't exist
//     if (!todo) res.status(404).send("data is not found");
//     //if OK, update properties to what has been submited
//     else todo.description = req.body.description;
//     todo.responsible = req.body.responsible;
//     todo.priority = req.body.priority;
//     todo.completed = req.body.completed;
//     //save new values to DB
//     todo
//       .save()
//       .then((todo) => {
//         res.json("Todo updated");
//       })
//       .catch((err) => {
//         res.status(404).send("Update not possible");
//       });
//   });
// });
// //-----------------------
// //DELETE
// todoRoutes.route("/:id").delete((req, res) => {
//   Todo.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Todo deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//-----------------------------------------
//=========================================
app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
});
