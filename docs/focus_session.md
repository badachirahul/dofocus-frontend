# User schema
|Field
|--------------------
|UserID
|Name  
|Email
|Password
|createdAt
|updatedAt 
    
# Task schema
|Field
|--------------------
|id 
|task_name
|completed
|userId
|createdAt
|updatedAt

# Session schema
| Field                 
| -------------------- 
| sessionID             
| TaskID               
| TimerDurationSeconds 
| FocusedSeconds       
| Status               
| LastResumedAt        
| StartedAt            
| EndedAt              

# API's endpoints

For the current MVP design of DoFocus, these endpoints are enough and clean.

# 1. Start Focus Session

```http
POST /api/v1/focus/start
```

Purpose:

* create new focus session
* initialize timer

Request:

```json
{
  "task_id": "uuid",
  "timer_duration_seconds": 1500
}
```

Response:

```json
{
  "message": "Focus session started",
  "data": {
    "session_id": "uuid",
    "status": "active"
  }
}
```

---

# 2. Pause Focus Session

```http
POST /api/v1/focus/pause/:sessionId
```

Purpose:

* calculate latest focused interval
* update focused_seconds
* mark paused

Used for:

* pause button
* browser/tab close auto-pause

Response:

```json
{
  "message": "Session paused"
}
```

---

# 3. Resume Focus Session

```http
POST /api/v1/focus/resume/:sessionId
```

Purpose:

* continue paused session
* set last_resumed_at
* status=active

Response:

```json
{
  "message": "Session resumed"
}
```

---

# 4. Finish Task

```http
POST /api/v1/focus/finish/:sessionId
```

Purpose:

* finalize current focus interval
* mark session completed
* mark task completed=true

Response:

```json
{
  "message": "Task completed successfully"
}
```

---

# 5. Cancel Session

```http
POST /api/v1/focus/cancel/:sessionId
```

Purpose:

* abandon current session
* do NOT mark task completed

Useful when:

```txt id="2m8q4x"
user gives up session
```

---

# 6. Get Current Session For Task

```http
GET /api/v1/focus/task/:taskId
```

Purpose:

* restore existing paused/active session
* restore timer state after revisit

Frontend uses this when opening focus page.

Example response:

```json
{
  "session_id": "uuid",
  "status": "paused",
  "timer_duration_seconds": 1500,
  "focused_seconds": 120
}
```

Frontend calculates:

```txt id="7q2m5x"
1500 - 120
= 1380 sec remaining
```

---

# Important Architectural Rule

Frontend NEVER sends:

```txt id="4m1x8q"
focused_seconds
```

Backend calculates everything.

Frontend only triggers:

* start
* pause
* resume
* finish
* cancel

This keeps timer data trustworthy.
