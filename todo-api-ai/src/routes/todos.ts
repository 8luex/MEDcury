import express from "express";
import { Todo } from "../models/todo";
import { v4 as uuidv4 } from "uuid";
import { validateCreateTodo, validateUpdateTodo } from "../middleware/validate";

const router = express.Router();

// In-memory store
const todos: Todo[] = [];

/**
 * GET /todos
 * optional query params:
 *  - completed=true|false
 *  - q=search text (search title or description)
 */
router.get("/", (req, res) => {
  let results = todos.slice();

  const { completed, q } = req.query;

  if (completed !== undefined) {
    const comp = String(completed).toLowerCase();
    if (comp === "true" || comp === "false") {
      const boolVal = comp === "true";
      results = results.filter(t => t.completed === boolVal);
    }
  }

  if (q && typeof q === "string") {
    const qLower = q.toLowerCase();
    results = results.filter(
      t => t.title.toLowerCase().includes(qLower) || (t.description && t.description.toLowerCase().includes(qLower))
    );
  }

  res.json(results);
});

/**
 * GET /todos/:id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

/**
 * POST /todos
 * body: { title: string, description?: string }
 */
router.post("/", validateCreateTodo, (req, res) => {
  const { title, description } = req.body;
  const now = new Date().toISOString();
  const todo: Todo = {
    id: uuidv4(),
    title: title.trim(),
    description: description ? String(description).trim() : undefined,
    completed: false,
    createdAt: now,
    updatedAt: now
  };
  todos.push(todo);
  res.status(201).json(todo);
});

/**
 * PUT /todos/:id
 * Replace entire resource (title, description, completed)
 */
router.put("/:id", validateUpdateTodo, (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex === -1) return res.status(404).json({ error: "Todo not found" });

  const existing = todos[todoIndex];
  const { title, description, completed } = req.body;

  // Require title if not provided? We'll allow partial but PUT semantics: if fields omitted, keep previous.
  const updated: Todo = {
    ...existing,
    title: title !== undefined ? String(title).trim() : existing.title,
    description: description !== undefined ? (description ? String(description).trim() : undefined) : existing.description,
    completed: completed !== undefined ? completed : existing.completed,
    updatedAt: new Date().toISOString()
  };

  todos[todoIndex] = updated;
  res.json(updated);
});

/**
 * PATCH /todos/:id
 * Partial update (same validations)
 */
router.patch("/:id", validateUpdateTodo, (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { title, description, completed } = req.body;

  if (title !== undefined) todo.title = String(title).trim();
  if (description !== undefined) todo.description = description ? String(description).trim() : undefined;
  if (completed !== undefined) todo.completed = completed;

  todo.updatedAt = new Date().toISOString();

  res.json(todo);
});

/**
 * DELETE /todos/:id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Todo not found" });
  const removed = todos.splice(idx, 1)[0];
  res.json({ success: true, removed });
});

/**
 * DELETE /todos (delete all) - useful for testing
 */
router.delete("/", (req, res) => {
  const count = todos.length;
  todos.length = 0;
  res.json({ success: true, deletedCount: count });
});

export default router;
