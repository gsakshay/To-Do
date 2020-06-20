const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoListSchema = new mongoose.Schema({
    todo: String
});

const Todo = mongoose.model("todo",todoListSchema);

const one = new Todo({
    todo:"Enter your work in the textarea,New task below"
})
const two = new Todo({
    todo: "Hit + button add your todo list item",
});


app.get("/",(req,res)=>{

    Todo.find({},(err, tasks) => {
      if (err) {
        console.log("error: ", err);
      } else {
        if(tasks.length === 0){
            Todo.insertMany([one, two], (err) => {
              if (err) {
                console.log("Error", err);
              } else {
                console.log("Instructions are successfully added");
              }
            });
            res.redirect("/")
        }else{
            const dayOfWeek = date();
            res.render("lists", { day: dayOfWeek, newTask: tasks });
        } 
      }
    });

})

app.post("/",(req,res)=>{

    const task = new Todo({
      todo: req.body.newItem 
    });
    task.save();
    res.redirect("/")
});

app.post("/delete",(req,res)=>{

    Todo.findByIdAndRemove(req.body.checkbox,(err)=>{
        if(err){
            console.log("error: ",err);
        }else{
            console.log("Successfully deleted the checked item")
        }
    });
    res.redirect("/");
})


app.listen(3000,()=>console.log("Running in port 3000"));