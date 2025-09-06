export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
