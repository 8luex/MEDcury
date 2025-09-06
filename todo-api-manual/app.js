const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const todoList = [];

// get all tasks
app.get("/todo", (req, res) => {
  const response = {
    message: "OK",
    data: todoList.map((item, index) => ({ id: index, ...item })),
  };
  res.status(200).json(response);
});

// add new task
app.post("/todo", (req, res) => {
  todoList.push({ task: req.body.task, done: false });
  const response = { message: "Created" };
  res.status(201).json(response);
});

// mark task as done or not done
app.patch("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = todoList.find((item, idx) => idx === id);
  if (item) {
    item.done = item.done ? false : true;
    const response = { message: "Updated" };
    res.status(200).json(response);
  } else {
    const response = { message: "Not Found" };
    res.status(404).json(response);
  }
});

// clear task
app.delete("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todoList.findIndex((item, idx) => idx === id);
  if (index !== -1) {
    todoList.splice(index, 1);
    const response = { message: "Deleted" };
    res.status(200).json(response);
  } else {
    const response = { message: "Not Found" };
    res.status(404).json(response);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
