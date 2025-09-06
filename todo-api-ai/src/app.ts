import express from "express";
import todosRouter from "./routes/todos";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/todos", todosRouter);

// health
app.get("/", (req, res) => res.json({ status: "ok", version: "1.0.0", name: "todo-api-ai" }));

// 404
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

export default app;
