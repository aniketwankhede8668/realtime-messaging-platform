# Realtime Messaging Platform

A scalable realtime chat application built using React.js, Node.js, Socket.IO, Redis Pub/Sub, BullMQ, and MongoDB.

This project demonstrates realtime communication, asynchronous processing, distributed event handling, and scalable backend architecture.

---

# System Design Highlights

- Distributed realtime communication using Redis Pub/Sub
- Asynchronous background processing with BullMQ workers
- Persistent chat history using MongoDB
- JWT-based authentication flow
- Scalable websocket architecture
- Responsive mobile-first chat interface

# Features

- Realtime messaging
- JWT Authentication
- Login & Registration
- Online user tracking
- Typing indicators
- Message timestamps
- Image sharing
- Auto-scroll chat
- Own message alignment
- Responsive UI
- Redis Pub/Sub architecture
- BullMQ Queue processing
- Worker-based MongoDB persistence

---

# Tech Stack

## Frontend
- React.js
- Socket.IO Client
- CSS3
- Vite

## Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Redis
- BullMQ
- JWT Authentication

---

# Architecture

```text
Client
   ↓
Socket.IO Server
   ↓
Redis Pub/Sub
   ↓
BullMQ Queue
   ↓
Worker Process
   ↓
MongoDB
```

---

# Why Redis + Queue + Worker?

This architecture separates realtime communication from database operations.

## Redis Pub/Sub
Used for broadcasting realtime events across socket connections.

## BullMQ Queue
Used for asynchronous message processing.

## Worker
Handles MongoDB persistence in the background without blocking realtime communication.

This improves:
- scalability
- responsiveness
- separation of concerns
- realtime performance

---

# Project Structure

```text
realtime-messaging-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── socket/
│   │   └── styles/
│   │
│   ├── index.html
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── queues/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── websocket/
│   │   └── workers/
│   │
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml
├── package.json
└── README.md
```s

---

# Environment Variables

## Frontend `.env`

```env
VITE_SOCKET_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api/auth
```

---

## Backend `.env`

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/message

JWT_SECRET=your_secret_key

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

# Run Project

## Start Redis & MongoDB

```bash
docker compose up
```

---

## Start Backend

```bash
cd backend
npm install
npm start
```

---

## Start Worker

```bash
npm run worker
```

---

## Start Frontend

```bash
cd frontend
npm install
npm run dev
```

# Deployment

## Frontend
- Vercel

## Backend & Worker
- Render

## Database
- MongoDB Atlas

## Redis
- Upstash Redis
```

---

# Realtime Features

- Instant message delivery
- Online presence tracking
- Typing indicators
- Realtime UI synchronization
- Automatic scroll management

---

# Engineering Concepts Implemented

- Realtime bidirectional communication
- Event-driven architecture
- Pub/Sub messaging pattern
- Queue-based asynchronous processing
- Worker architecture
- Socket lifecycle management
- JWT authentication flow
- Client-side image compression
- Responsive UI design

---

# Future Improvements

- Group chat
- Read receipts
- Cloud image storage
- Message pagination
- Dockerized deployment
- Kubernetes scaling

---

# Author

Aniket Wankhede