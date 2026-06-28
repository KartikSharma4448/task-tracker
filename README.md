# Task Tracker

A full-stack task management application built with the MERN stack. Create, organize, and track tasks with filtering, sorting, search, and a responsive dark/light UI.

## Tech Stack

**Frontend:** React 18, React Router, Axios, React Hot Toast, React Icons, Vite  
**Backend:** Node.js, Express, Mongoose, Express Validator, Helmet, Morgan  
**Database:** MongoDB Atlas  

## Features

- Full CRUD operations for tasks
- Search across task titles and descriptions
- Filter by status and priority
- Sort by date, due date, priority, or title
- Pagination
- Dark mode with system preference detection
- Toast notifications on actions
- Confirmation modal before deleting
- Responsive design (mobile, tablet, desktop)
- Form validation on both frontend and backend
- Loading and empty states
- Overdue task indicators

## Installation

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend

```bash
cd client
npm install
cp .env.example .env
# Edit .env if backend runs on a different URL
npm run dev
```

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend origin for CORS |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

## Folder Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   └── ui/          # Base UI primitives
│   │   ├── constants/       # App-wide constants
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Route-level pages
│   │   ├── services/        # API service layer
│   │   ├── styles/          # Global CSS
│   │   └── utils/           # Helper functions
│   └── public/
├── server/
│   └── src/
│       ├── config/          # Database configuration
│       ├── controllers/     # Request handlers
│       ├── middleware/       # Express middleware
│       ├── models/          # Mongoose schemas
│       ├── routes/          # API route definitions
│       ├── services/        # Business logic
│       └── validators/      # Input validation rules
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (with filters, sorting, pagination) |
| GET | `/api/tasks/stats` | Get task count by status |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Query Parameters (GET /api/tasks)

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |
| `priority` | string | Filter by priority |
| `search` | string | Search in title/description |
| `sortBy` | string | Sort field (createdAt, dueDate, priority, title) |
| `order` | string | asc or desc |
| `page` | number | Page number |
| `limit` | number | Items per page (max 50) |

### Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 25,
    "pages": 3
  }
}
```

## Deployment

### Frontend (Vercel)

1. Push the `client` folder to a Git repository
2. Import the repo in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add `VITE_API_URL` environment variable pointing to your deployed backend

### Backend (Render)

1. Push the `server` folder to a Git repository
2. Create a new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables: `MONGODB_URI`, `NODE_ENV=production`, `CLIENT_URL`

### Database (MongoDB Atlas)

1. Create a free cluster at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist your backend IP (or 0.0.0.0/0 for Render)
4. Copy the connection string to `MONGODB_URI`

## Screenshots

> Add screenshots here after deployment

## Future Improvements

- User authentication
- Task categories/labels
- Drag-and-drop task reordering
- Subtasks and checklists
- Email reminders for due dates
- Activity log / audit trail
- Export tasks as CSV
