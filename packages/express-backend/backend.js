import express from "express";
import cors from "cors";
import userService from "./services/user-service.js"
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();


const{MONGO_CONNECTION_STRING} = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));


//variables
const app  = express()
const port = 8000

app.use(cors());
app.use(express.json());



//get functions
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService.getUsers(name, job)
  .then((users) => res.send({users_list: users}) )
  .catch((error) => {
    console.log(error);
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id)
  .then((result)=>{
    res.send({users_list: result});
  })
  .catch((error)=>{
    console.log(error);
    res.status(404).send("Resource not found.")
  })
});

//post functions
app.post("/users", (req, res) => {
  const newUser = req.body;
  userService.addUser(newUser)
  .then((savedUser)=>{
    res.status(201).send(savedUser);
  })
  .catch((error) => {
  console.log(error);
  });
});

//delete functions
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    userService.deleteUserById(id)
    .then((deleted) => {
      if (!deleted){
        res.status(404).send("Resource not found.");
      }else{
          res.status(204).send()
          console.log(`User ${deleted.name} deleted from user list`)
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//listening port
app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});