const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
//-------------------------
require("dotenv").config();
// console.log(process.env.DB_URI);
//-----------------------------------
app.use(cors());
//parse 'json' when server sends&recieves 'json'
app.use(express.json());
//---------------------------
//Routes
const todos = require("./routes/todos");
app.use("/todos", todos);
//-------------------------------
//first for deploying; second for developing
//You don't need to set this PORT variable up with Heroku yourself - it will do it for you.
const PORT = process.env.PORT || 4000;
//------------------------------------
//(Deploying Step 1)
// to test what enviroment that we're at
//if we're in a prodaction enviroment run this code:
if (process.env.NODE_ENV === "production") {
  //that means we're hosted on Heroku/other hosting
  //first - tell express where our static files are located
  //When we run "npm run build" within our client directory
  //it is going to create a folder "build" within our client
  //where static files are going to be located
  app.use(express.static("client/build"));
  //2 serve react app
  //* === all
  //any get request send our react app to the user
  app.get("*", (req, res) => {
    //3 find where the static files are located
    //define the path - use path module & join
    //directory name, go inside "client" folder=>inside 'build'
    //folder & there is index.html
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
//otherwise => don't run the code above for development
//-------------------------
//MongoDB
//(Deploy Step 2) => Step 3 is in the 'package.json' script 'heroku-postbuild' => Step 4 ===delete .git folder from 'client' directory
// 'DB_URI' is env.var for Heroku
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
//=========================================
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
