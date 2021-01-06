const mongoose = require("mongoose");

//access to Schema Object
const Schema = mongoose.Schema;
const Todo = new Schema({
  description: {
    type: String,
  },
  responsible: {
    type: String,
  },
  priority: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});
//model name "Todo" from let Todo
module.exports = mongoose.model("Todo", Todo);
//will be imported in server.js
