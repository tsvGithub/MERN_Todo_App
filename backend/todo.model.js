const mongoose = require("mongoose");

//access to Schema Object
const Schema = mongoose.Schema;
//describe Schema
let Todo = new Schema({
  todo_description: {
    type: String,
  },
  todo_responsible: {
    type: String,
  },
  todo_priority: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
});
//model name "Todo" from let Todo
module.exports = mongoose.model("Todo", Todo);
//will be imported in server.js
