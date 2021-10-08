const mongoose = require("mongoose");

//access to Schema Object
const Schema = mongoose.Schema;
const Todo = new Schema({
  todo: {
    type: String,
    trim: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  //sorting for sortable
  sorting: {
    type: Number,
    default: 0,
  },
});
//model name "Todo" from let Todo
module.exports = mongoose.model("Todo", Todo);
//will be imported in server.js
