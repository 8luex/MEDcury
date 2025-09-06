import { Request, Response, NextFunction } from "express";

export function validateCreateTodo(req: Request, res: Response, next: NextFunction) {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "title is required and must be a non-empty string" });
  }
  next();
}

export function validateUpdateTodo(req: Request, res: Response, next: NextFunction) {
  const { title, description, completed } = req.body;
  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res.status(400).json({ error: "title must be a non-empty string if provided" });
  }
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "description must be a string if provided" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be a boolean if provided" });
  }
  next();
}
