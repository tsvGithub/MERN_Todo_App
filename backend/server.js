const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//to access to the Express router to connect endpoints & server
const todoRoutes = express.Router();
const PORT = 4000;
//------------------------------------
//importing Todo to access the Schema for Mongoose from todo.model.js
let Todo = require("./todo.model");
//------------------------------------
//calling the CORS & body-parser
app.use(cors());
app.use(bodyParser.json());
//-------------------------------------
//calling mongoose to connect to 'todos' DB & config objects
mongoose.connect("mongodb://localhost:27017/todos", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
//===============================================
//CRUD
//to attach endpoints to Server
//---------------------------------------
//READ
todoRoutes.route("/").get(function (req, res) {
  //retrieve all items from DB usind data model Todo
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      //response with JSON object 'todos object'
      res.json(todos);
    }
  });
});
//---------------------------------------
//retrieve one specific item with id
todoRoutes.route("/:id").get(function (req, res) {
  //from URL params.id
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});
//--------------------------------------
//CREATE
//adding new todo to DB
todoRoutes.route("/").post(function (req, res) {
  //retrieve data from request body based on Todo data model
  let todo = new Todo(req.body);
  //save todo to DB and (promise) .then
  todo
    .save()
    .then((todo) => {
      //if OK, return JSON Object {{}}
      res.status(200).json({ todo: "todo added successfully" });
    })
    //or cathc error
    .catch((err) => {
      res.status(400).send("adding new todo fialed");
    });
});
//--------------------------------------------------------
//UPDATE
//update route, for example, completed specific item
todoRoutes.route("/:id").put(function (req, res) {
  //retrieve todo item from DB using id
  Todo.findById(req.params.id, function (err, todo) {
    //if todo doesn't exist
    if (!todo) res.status(404).send("data is not found");
    //if OK, update properties to what has been submited
    else todo.description = req.body.description;
    todo.responsible = req.body.responsible;
    todo.priority = req.body.priority;
    todo.completed = req.body.completed;
    //save new values to DB
    todo
      .save()
      .then((todo) => {
        res.json("Todo updated");
      })
      .catch((err) => {
        res.status(404).send("Update not possible");
      });
  });
});
//-----------------------
//DELETE
todoRoutes.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//-----------------
//to access to the Express router to connect endpoints & server
//inserting the Router which is attached to URL path "/todos"
//& attach the router -> todoRoutes
app.use("/todos", todoRoutes);

app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
});
