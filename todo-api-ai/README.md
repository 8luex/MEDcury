# Todo List REST API (AI-generated)

This is a simple Todo List REST API built with Node.js, Express and TypeScript.  
Data is stored in-memory (no database). The project was generated using AI tools; prompts used are recorded in `PROMPTS.md`.

## Features

- CRUD for todos
- Query: filter by `completed` and search by `q` (title/description)
- Validation middleware
- In-memory storage (ephemeral)

## Requirements

- Node.js 16+ (recommended)
- npm

## Setup

1. Clone or copy project files into `todo-api-ai/`
2. Install dependencies:

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

## Build & Run (production)

```bash
npm run build
npm start
```

## API Endpoints

- Base: http://localhost:3000

## Health

```sql
GET /
```

## Response:

```json
{ "status": "ok", "version": "1.0.0", "name": "todo-api-ai" }
```

## List todos

```bash
GET /todos
GET /todos?completed=true
GET /todos?q=shopping
```

## Get one

```bash
GET /todos/:id
```

## Create

```bash
POST /todos
Content-Type: application/json

{
  "title": "Buy milk",
  "description": "2L whole milk"
}
```

## Replace / Update

```bash
PUT /todos/:id
Content-Type: application/json
{
  "title": "Buy milk and bread",
  "description": "...",
  "completed": false
}
```

## Partial update

```bash
PATCH /todos/:id
Content-Type: application/json
{
  "completed": true
}
```

## Delete one

```bash
DELETE /todos/:id
```

## Delete all

```bash
DELETE /todos
```

## Example curl requests

- Create:

```bash
curl -X POST http://localhost:3000/todos \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk","description":"2L"}'
```

- List:

```bash
curl http://localhost:3000/todos
```

- Get:

```bash
curl http://localhost:3000/todos/<id>
```

- Update (patch):

```bash
curl -X PATCH http://localhost:3000/todos/<id> \
 -H "Content-Type: application/json" \
 -d '{"completed":true}'
```

- Delete:

```bash
curl -X DELETE http://localhost:3000/todos/<id>
```

## Notes

- Data is ephemeral: restarting the server clears all todos.
- This implementation is intended for learning / assessment purposes only.
