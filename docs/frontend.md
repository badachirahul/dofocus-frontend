# DoFocus Frontend Documentation

# Overview

This document describes the frontend architecture, folder structure, pages, components, utilities, API integration structure, and frontend logic for the DoFocus application.

---

# Frontend Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend library |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router DOM | Routing |
| Fetch API | API calls |
| Context API | Global state management |

---

# Frontend Architecture

```text
React Application
       ↓
Pages
       ↓
Components
       ↓
API Layer
       ↓
Backend (Go + Gin)
```

---

# Project Folder Structure

```text
dofocus-frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   ├── authApi.js
│   │   ├── taskApi.js
│   │   └── focusApi.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── task/
│   │   │   ├── TaskInput.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskFilter.jsx
│   │   │
│   │   ├── focus/
│   │   │   ├── Timer.jsx
│   │   │   ├── TimerControls.jsx
│   │   │   └── FocusStats.jsx
│   │   │
│   │   └── profile/
│   │       ├── Heatmap.jsx
│   │       ├── ProfileCard.jsx
│   │       └── DailyTasks.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useTimer.js
│   │   └── useTasks.js
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── FocusPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatDate.js
│   │   ├── localStorage.js
│   │   └── timerUtils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

# Pages

# 1. Landing Page

## Purpose
Introduce the application to users before authentication.

## Features
- Hero section
- Features section
- Productivity explanation
- Sign Up button
- Login button

---

# 2. Login Page

## Features
- Email input
- Password input
- Login button
- Redirect after login

---

# 3. Register Page

## Features
- Name input
- Email input
- Password input
- User registration

---

# 4. Dashboard Page

## Features
- Welcome message
- Add task input
- Task list
- Edit task
- Delete task
- Mark task as completed
- Filter tasks
- Navigate to focus page

---

# 5. Focus Page

## Features
- Task title
- Pomodoro timer
- Start button
- Pause button
- Reset button
- Finish session button
- Custom timer duration

---

# 6. Profile Page

## Features
- User details
- Calendar heatmap
- Daily completed tasks
- Productivity statistics

---

# Components

# Common Components

## Header.jsx
Used across all pages.

### Responsibilities
- Navigation
- Logo
- Profile button

---

## Footer.jsx

### Responsibilities
- Footer links
- Copyright

---

## Button.jsx

Reusable button component.

---

# Task Components

## TaskInput.jsx

### Responsibilities
- Input task name
- Add new task

---

## TaskList.jsx

### Responsibilities
- Render task list

---

## TaskCard.jsx

### Responsibilities
- Display:
  - Checkbox
  - Task name
  - Edit button
  - Delete button
  - Let's Focus button

---

## TaskFilter.jsx

### Responsibilities
- Filter:
  - All
  - Pending
  - Completed

---

# Focus Components

## Timer.jsx

### Responsibilities
- Display timer
- Countdown logic

---

## TimerControls.jsx

### Responsibilities
- Start timer
- Pause timer
- Reset timer
- Finish timer

---

# Profile Components

## Heatmap.jsx

### Responsibilities
- Display productivity heatmap
- Show completed tasks per day

---

## DailyTasks.jsx

### Responsibilities
- Show tasks completed for selected date

---

# Utilities

## formatDate.js

### Responsibilities
- Format timestamps
- Convert date formats

---

## localStorage.js

### Responsibilities
- Store JWT token
- Retrieve token
- Remove token

---

## timerUtils.js

### Responsibilities
- Convert minutes
- Format countdown
- Timer calculations

---

# Hooks

## useTimer.js

### Responsibilities
- Handle timer state
- Start/Pause logic
- Countdown logic

---

## useTasks.js

### Responsibilities
- Manage task state
- Fetch tasks
- Update tasks

---

## useAuth.js

### Responsibilities
- Login state
- Authentication status

---

# Context API

# AuthContext.jsx

### Responsibilities
- Store user authentication state
- Manage JWT token
- Logout handling

---

# TaskContext.jsx

### Responsibilities
- Global task state
- Shared task updates

---

# Routing Structure

```text
/                 → Landing Page
/login            → Login Page
/register         → Register Page
/dashboard        → Dashboard Page
/focus/:taskId    → Focus Page
/profile          → Profile Page
```

---

# API Layer

# authApi.js

## Responsibilities
- Register API call
- Login API call

---

# taskApi.js

## Responsibilities
- Create task
- Fetch tasks
- Update task
- Delete task

---

# focusApi.js

## Responsibilities
- Start focus session
- End focus session
- Fetch focus history

---

# API Base URL

```javascript
const BASE_URL = "http://localhost:8080/api/v1";
```

---

# Frontend Logic Flow

# User Registration Flow

```text
User enters details
        ↓
Frontend validation
        ↓
API request sent
        ↓
Backend validation
        ↓
Success response
        ↓
Redirect to login
```

---

# Login Flow

```text
User login
      ↓
JWT token received
      ↓
Token stored in localStorage
      ↓
Protected routes enabled
```

---

# Task Creation Flow

```text
User enters task
        ↓
API request sent
        ↓
Task stored in database
        ↓
Task list updated
```

---

# Focus Session Flow

```text
User clicks "Let's Focus"
          ↓
Navigate to focus page
          ↓
Timer starts
          ↓
Session completed
          ↓
Focus session saved
```

---

# Heatmap Logic

## Data Format

```json
[
  {
    "date": "2026-05-18",
    "count": 5
  }
]
```

## Usage
- Display productivity activity
- Show streak consistency
- Daily completion tracking

---

# State Management Strategy

| State | Management |
|---|---|
| Authentication | Context API |
| Tasks | Context API |
| Timer | Local component state |
| Theme | Context API (future) |

---

# Protected Routes

## Protected Pages
- Dashboard
- Focus Page
- Profile Page

If JWT token does not exist:
- Redirect to login page

---

# Styling Strategy

## Tailwind CSS

### Benefits
- Faster UI development
- Responsive design
- Reusable utility classes
- Cleaner styling architecture

---

# Future Frontend Enhancements

## Planned Features
- Dark mode
- Mobile responsiveness improvements
- PWA support
- Push notifications
- Drag and drop tasks
- Real-time sync
- Animated productivity dashboard

---

# Development Principles

- Component reusability
- Clean folder structure
- Separation of concerns
- API abstraction
- Responsive UI
- Minimal and modern design

---

# Conclusion

The DoFocus frontend architecture is designed to be:
- Scalable
- Maintainable
- Beginner-friendly
- Cleanly structured
- Easy to expand in future versions

The structure supports rapid MVP development while maintaining production-level organization.