const express = require("express");
const app = express.Router();
//importing Todo to access the Schema for Mongoose from todo.model.js
const Todo = require("../todo.model");
//Routes:
//POST a new todo on DB:
app.post("/", async (req, res) => {
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
app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.log(error);
  }
});
//GET completed todos :
app.get("/completed", async (req, res) => {
  try {
    const completed = await Todo.find({ isCompleted: true });
    // console.log(completed);
    res.json({ completed: completed });
  } catch (error) {
    console.log(error);
  }
});
//UPDATE one todo:
app.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});
//Update todos:
app.put("/", async (req, res) => {
  const todosIds = req.body;
  //Array of objects {i _id}: i===sorting, _id=>todo's _id
  for (const [i, id] of todosIds.entries()) {
    await Todo.updateOne({ _id: id }, { sorting: i });
    // console.log(i, id);
  }
  const todos = await Todo.find();
  // console.log(todos);
  res.json(todos);
});
//DELETE one todo:
app.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json("Todo deleted!");
  } catch (error) {
    console.log(error);
  }
});
//DELETE many todos
app.delete("/", async (req, res) => {
  const result = await Todo.deleteMany({ isCompleted: true })
    .then(function () {
      console.log("Completed Todos deleted");
    })
    .catch(function (error) {
      console.log(error);
    });

  res.json("Completed Todos deleted!");
});

module.exports = app;
