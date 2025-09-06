# Todo List REST API

- ใช้ todoList ที่เป็น array ในหน่วยความจำของ server เพื่อเก็บ tasks โดยไม่ connect database
- task จะเป็น object
- ใช้ index ของ array แทน id
- ใช้ Express.js

## Features

- CRUD for todos
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

## Run

```bash
node app.js
```

## API Endpoints

- Base: http://localhost:3000

## Get all tasks

```bash
GET /todo
```

## Response:

```json
{
  "message": "OK",
  "data": [
    {
      "id": 0,
      "task": "Work out",
      "done": false
    }
  ]
}
```

## Add new task

```bash
POST /todo
Content-Type: application/json
{
  "task": "Work out"
}
```

## Mark task as done or not done

```bash
PATCH /todo/:id
```

## Response:

```json
{
  "message": "Updated"
}
```

## Clear task

```bash
DELETE /todo/:id
```

## Response:

```json
{
  "message": "Deleted"
}
```

## Example curl requests

- Get all tasks:

```bash
curl http://localhost:3000/todo
```

- Add new task:

```bash
curl -X POST http://localhost:3000/todo \
 -H "Content-Type: application/json" \
 -d '{"task":"Work out"}'
```

- Mark task as done or not done:

```bash
curl -X PATCH http://localhost:3000/todo/<id>
```

- Clear task:

```bash
curl -X DELETE http://localhost:3000/todo/<id>
```
