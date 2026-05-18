# DoFocus

## Project Overview

**DoFocus** is a productivity-focused web application that combines a **To-Do management system** with the **Pomodoro technique** to help students and professionals improve focus, track productivity, and manage tasks efficiently.

The application allows users to create tasks, start focused work sessions, and monitor the time spent on each task.

---

# Problem Statement

Students preparing for:
- Final examinations
- Government examinations
- Competitive exams

often struggle with:
- Maintaining focus
- Managing study tasks
- Tracking productivity
- Avoiding distractions

Most existing applications either provide only task management or only focus timers.

---

# Solution

DoFocus solves this problem by combining:
- Task Management
- Focus Sessions (Pomodoro)
- Productivity Tracking
- Daily Analytics

Users can:
1. Create tasks
2. Start a focus session for a specific task
3. Track focus duration
4. Monitor completed tasks using a calendar heatmap

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Ant Design
- React Router

## Backend
- Go (Golang)
- Gin Framework
- GORM

## Database
- PostgreSQL

## Authentication
- JWT Authentication

---

# System Architecture

```text
React Frontend
       ↓
Go REST API (Gin)
       ↓
PostgreSQL Database
```

---

# Database Schema

## 1. User Table

| Column Name | Type | Description |
|---|---|---|
| user_id | UUID / INT | Primary Key |
| name | VARCHAR | User full name |
| email | VARCHAR | User email |
| password | VARCHAR | Encrypted password |
| created_at | TIMESTAMP | Account creation date |
| updated_at | TIMESTAMP | Last updated timestamp |

---

## 2. Task Table

| Column Name | Type | Description |
|---|---|---|
| task_id | UUID / INT | Primary Key |
| user_id | UUID / INT | Foreign key referencing user |
| task_name | VARCHAR | Name of task |
| task_status | ENUM | Pending / Completed |
| created_at | TIMESTAMP | Task creation date |
| updated_at | TIMESTAMP | Last updated timestamp |
| completed_at | TIMESTAMP | Task completion date |

---

## 3. Focus Session Table

| Column Name | Type | Description |
|---|---|---|
| session_id | UUID / INT | Primary Key |
| task_id | UUID / INT | Foreign key referencing task |
| duration_in_minutes | INT | Focus session duration |
| started_at | TIMESTAMP | Session start time |
| ended_at | TIMESTAMP | Session end time |

---

# Application Pages

## 1. Landing Page

### Features
- Application introduction
- How DoFocus works
- Productivity benefits
- Feature highlights
- Sign Up / Login buttons

---

## 2. Registration Page

### Features
- Full name input
- Email input 
- Mail verification through OTP
- Password input
- User registration

---

## 3. Login Page

### Features
- Email input
- Password input
- User authentication

---

## 4. Task Page (Home Page)

### Features
- Welcome message
- Add task input
- Display task list
- Edit task
- Delete task
- Mark task as completed
- "Let's Focus" button
- Filter tasks:
  - All
  - Pending
  - Completed

---

## 5. Focus Page

### Features
- Display selected task title
- Pomodoro timer
- Default timer: 25 minutes
- Custom timer support
- Start button
- Pause button
- Reset button
- Finish session button

---

## 6. Profile Page

### Features
- User profile details
- Account creation date
- Productivity statistics
- Calendar Heatmap
- Daily completed task view

### Calendar Heatmap
The heatmap displays:
- Daily completed tasks
- Productivity consistency
- Focus streaks

When a user selects a specific date:
- Completed tasks for that day are displayed

---

# Core Functional Flow

```text
User creates task
        ↓
Task appears in dashboard
        ↓
User clicks "Let's Focus"
        ↓
Focus session starts
        ↓
Timer runs
        ↓
Session completed
        ↓
Task progress updated
```

---

# Planned API Endpoints

## Authentication APIs

```http
POST /register
POST /login
```

---

## Task APIs

```http
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

---

## Focus Session APIs

```http
POST /focus/start
POST /focus/end
GET  /focus/history
```

---

# Non-Functional Requirements

- Responsive UI
- Fast API response
- Secure authentication
- Clean user experience
- Scalable backend architecture
- Optimized database queries

---

# Future Scope

## Planned Features
- Google OAuth login
- Email notifications
- AI task suggestions
- Study analytics dashboard
- Team study rooms
- Mobile application
- Daily productivity reports
- Streak tracking system
- Calendar integration

---

# Project Goals

The primary goals of DoFocus are:
- Improve productivity
- Encourage deep work
- Reduce distractions
- Help users maintain study consistency
- Track time spent on meaningful tasks

---

# Development Approach

## Current Architecture
- Monolithic architecture

## Reason
The project is currently in MVP stage, and a monolithic architecture:
- Simplifies development
- Reduces complexity
- Speeds up deployment
- Improves maintainability for small teams

Microservices can be considered in future scaling phases.

---

# Conclusion

DoFocus aims to become a modern productivity platform that helps users:
- Manage tasks efficiently
- Focus deeply
- Track productivity visually
- Build consistent study habits

By combining task management with focused work sessions, DoFocus provides a simple but powerful productivity experience.