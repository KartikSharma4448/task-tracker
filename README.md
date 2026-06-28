# Task Tracker

A simple task management app I built using React and Node.js. Nothing fancy — just a clean way to create, edit, delete and organize tasks with some nice filtering and dark mode thrown in.

**Live:** [Frontend](https://task-tracker-client-wes5.onrender.com) | [API](https://task-tracker-api-wes5.onrender.com)

---

## What it does

- Create, update, delete tasks
- Search tasks by title or description
- Filter by status (pending, in-progress, completed) and priority
- Sort by date, due date, priority, title
- Paginated task list
- Dark/light mode (picks up system preference)
- Shows overdue tasks
- Toast notifications + confirm before delete
- Works on mobile

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Express, Mongoose, express-validator |
| Database | MongoDB Atlas |
| Hosting | Render (both frontend and backend) |

---

## Running locally

You'll need Node 18+ and a MongoDB instance (Atlas free tier works fine).

**Backend:**

```bash
cd server
npm install
cp .env.example .env
# fill in MONGODB_URI
npm run dev
```

**Frontend:**

```bash
cd client
npm install
npm run dev
```

Vite proxies `/api` to `localhost:5000` in dev mode so no extra config needed.

## Env variables

**server/.env**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**client/.env** (only needed in production)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Project structure

```
client/
  src/
    components/     → TaskCard, StatsBar, Filters, etc.
    components/ui/  → Spinner, Modal, Badge (reusable bits)
    context/        → TaskContext, ThemeContext
    pages/          → Dashboard, TaskForm
    services/       → axios API layer
    hooks/          → useDebounce
    constants/      → status/priority enums
    styles/         → single CSS file

server/
  src/
    controllers/    → request handlers
    services/       → business logic (queries, pagination)
    models/         → Task schema
    routes/         → /api/tasks endpoints
    validators/     → express-validator rules
    middleware/     → error handler, validation runner
    config/         → db connection
```

## API

All endpoints are under `/api/tasks`:

```
GET    /api/tasks          → list (supports ?status, ?priority, ?search, ?sortBy, ?order, ?page, ?limit)
GET    /api/tasks/stats    → count by status
GET    /api/tasks/:id      → single task
POST   /api/tasks          → create
PUT    /api/tasks/:id      → update
DELETE /api/tasks/:id      → delete
```

Responses follow `{ success, data, message, pagination }` format.

---

## Deployment

Both frontend and backend are deployed on Render.

**Frontend (Static Site):**
- Root directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Env: `VITE_API_URL` = your Render backend URL + `/api`

**Backend (Web Service):**
- Root directory: `server`
- Build: `npm install`, Start: `npm start`
- Env vars: `MONGODB_URI`, `NODE_ENV=production`, `CLIENT_URL=<your frontend url>`

**Database → MongoDB Atlas** (free M0 cluster, whitelist 0.0.0.0/0 for Render)

---

## Screenshots

*todo: add after final deploy*

---

## What I'd add next

- Auth (JWT or session based)
- Labels/categories for tasks
- Drag and drop reordering
- Subtasks
- Due date email reminders
