import express from "express";

//variables
const app  = express()
const port = 8000
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

//helper functions
const findUserById = (id) => 
    users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByNJ = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

const deleteUser = (id) => {
    return users["users_list"].filter(
        (user) => user["id"] !== id
    );
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.use(express.json());

//get functions
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job == undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined && job != undefined){
    let result = findUserByNJ(name, job);
    result = {users_list : result};
    res.send(result);
  }else{
     res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined){
        res.status(404).send("Resource not found.");
    }else{
        res.send(result);
    }
});

//post functions
app.post("/users", (req, res) => {
    const newUser = req.body;
    addUser(newUser);
    res.send();
});

//delete functions
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let newlist = deleteUser(id);
    if (users["users_list"].length == newlist.length){
        res.status(404).send("Resource not found.");
    }else{
        users["users_list"] = newlist;
        res.send(users)
        console.log(`User ${id} deleted from user list`)
    }
});

//listening port
app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});