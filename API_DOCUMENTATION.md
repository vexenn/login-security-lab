# 📑 Smart Task Manager — API Specification Guide

This document provides a technical layout of the REST API routing architecture, expected JSON payloads, and session token evaluation constraints implemented within the core backend service engine.

## 🔐 Authentication Services Matrix

### 1. User Registration Identity Engine
* **Path:** `POST /users/register`
* **Access Control:** Public (Anonymous Access)
* **Payload Structure (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "user@example.com",
  "password": "your_secure_password_here"
}
```
* **Success Outbound Vector (201 Created):**
```json
{
  "message": "User registered successfully."
}
```

### 2. Cryptographic Token Issue Session
* **Path:** `POST /users/login`
* **Access Control:** Public (Anonymous Access)
* **Payload Structure (JSON):**
```json
{
  "email": "user@example.com",
  "password": "your_secure_password_here"
}
```
* **Success Outbound Vector (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🛠️ Task Management Orchestration Services

> ⚠️ **Authorization Barrier:** All resource routes listed below strictly mandate the delivery of a cryptographically valid JSON Web Token embedded within the transaction request headers layout:
> `Authorization: Bearer <JWT_TOKEN>`

### 1. Fetch Tenant Task Lookup Array
* **Path:** `GET /tasks`
* **Query Parameters (Optional Filters):** `search`, `category`, `priority`, `status`
* **Success Outbound Vector (200 OK):**
```json
[
  {
    "taskId": 1,
    "title": "Implement authentication middleware",
    "category": "Development",
    "priority": "High",
    "status": "Completed",
    "dueDate": "2026-07-06"
  }
]
```

### 2. Commit Task Parameterization Matrix
* **Path:** `POST /tasks`
* **Payload Structure (JSON):**
```json
{
  "title": "Deploy Cloud Pipeline Validation Hooks",
  "category": "Development",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-07-15"
}
```
* **Success Outbound Vector (201 Created):**
```json
{
  "message": "Task committed successfully.",
  "taskId": 2
}
```

### 3. Full Resource Rewrite (State Transformation)
* **Path:** `PUT /tasks/:id`
* **Payload Structure (JSON):** *(Requires full property serialization to respect database NOT NULL safety constraints)*
```json
{
  "title": "Implement authentication middleware",
  "category": "Development",
  "priority": "High",
  "status": "Completed",
  "dueDate": "2026-07-06"
}
```
* **Success Outbound Vector (200 OK):**
```json
{
  "message": "Task transformation matrix finalized successfully."
}
```

### 4. Database Record Purge Sequence
* **Path:** `DELETE /tasks/:id`
* **Success Outbound Vector (200 OK):**
```json
{
  "message": "Target task record permanently purged from database cluster."
}
```