const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const lists = []
app.get("/",(req,res)=>{

    const dayOfWeek = date();
    res.render("lists", { day: dayOfWeek, newTask: lists });

})

app.post("/",(req,res)=>{
    const task = req.body.newItem 
    lists.push(task);
    res.redirect("/")
})

app.listen(3000,()=>console.log("Running in port 3000"));