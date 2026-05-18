# DoFocus Backend Documentation

# Overview

This document describes the backend architecture, folder structure, API endpoints, request/response formats, and backend development standards for the DoFocus application.

---

# Backend Tech Stack

| Technology | Purpose |
|---|---|
| Go (Golang) | Backend language |
| Gin | HTTP web framework |
| GORM | ORM for database handling |
| PostgreSQL | Relational database |
| JWT | Authentication |
| bcrypt | Password encryption |

---

# Backend Architecture

```text
Client (React Frontend)
          ↓
REST API (Gin)
          ↓
Service Layer
          ↓
Repository / GORM
          ↓
PostgreSQL
```

---

# Project Folder Structure

```text
dofocus-backend/
│
├── cmd/
├── config/
├── database/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── dto/
│   ├── request/
│   └── response/
├── .env
├── go.mod
└── main.go
```

---

# Environment Variables

```env
PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=dofocus

JWT_SECRET=your_secret_key
```

---

# API Base URL

```text
http://localhost:8080/api/v1
```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /auth/register
```

### Request

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```http
POST /auth/login
```

### Request

```json
{
  "email": "rahul@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

---

# Task APIs

## Create Task

### Endpoint

```http
POST /tasks
```

### Request

```json
{
  "task_name": "Study DBMS"
}
```

### Response

```json
{
  "success": true,
  "message": "Task created successfully"
}
```

---

## Get All Tasks

### Endpoint

```http
GET /tasks
```

### Response

```json
{
  "success": true,
  "tasks": [
    {
      "task_id": 1,
      "task_name": "Study DBMS",
      "task_status": "Pending"
    }
  ]
}
```

---

## Update Task

### Endpoint

```http
PUT /tasks/:id
```

### Request

```json
{
  "task_name": "Study OS",
  "task_status": "Completed"
}
```

### Response

```json
{
  "success": true,
  "message": "Task updated successfully"
}
```

---

## Delete Task

### Endpoint

```http
DELETE /tasks/:id
```

### Response

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

# Focus Session APIs

## Start Focus Session

### Endpoint

```http
POST /focus/start
```

### Request

```json
{
  "task_id": 1,
  "duration_in_minutes": 25
}
```

### Response

```json
{
  "success": true,
  "message": "Focus session started"
}
```

---

## Finish Focus Session

### Endpoint

```http
POST /focus/end
```

### Request

```json
{
  "session_id": 1,
  "completed": true
}
```

### Response

```json
{
  "success": true,
  "message": "Focus session completed"
}
```

---

## Get Focus History

### Endpoint

```http
GET /focus/history
```

### Response

```json
{
  "success": true,
  "sessions": [
    {
      "session_id": 1,
      "duration_in_minutes": 25,
      "completed": true
    }
  ]
}
```

---

# Profile APIs

## Get Profile

### Endpoint

```http
GET /profile
```

### Response

```json
{
  "success": true,
  "data": {
    "name": "Rahul",
    "email": "rahul@gmail.com"
  }
}
```

---

## Get Heatmap Data

### Endpoint

```http
GET /profile/heatmap
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2026-05-18",
      "count": 5
    }
  ]
}
```

---

# Security

- JWT Authentication
- Password hashing using bcrypt
- Protected routes
- Input validation
- Environment variables

---

# Future Enhancements

- Google OAuth
- Redis caching
- WebSockets
- Docker support
- Swagger API docs
- Email notifications

---

# Conclusion

The DoFocus backend is designed to be scalable, maintainable, and production-ready for MVP development.