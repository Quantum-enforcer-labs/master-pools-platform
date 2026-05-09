# 🏊 MasterPools v2.0 — Professional Full-Stack Platform

Zimbabwe's premier pool construction platform, built like Amazon.

---

## ⚡ Quick Start

```bash
# 1. Backend
cd masterpools/backend
npm install
cp .env.example .env       # Fill in your values
npm run dev                # → http://localhost:5000

# 2. Frontend (new terminal)
cd masterpools/frontend
npm install
npm run dev                # → http://localhost:5173
```

---

---

## 🎯 New Features in v2.0

| Feature                      | Description                                                        |
| ---------------------------- | ------------------------------------------------------------------ |
| **Tailwind v4**              | No tailwind.config.js or postcss.config.js — all via @theme in CSS |
| **@tailwindcss/vite**        | Direct Vite plugin, fastest possible builds                        |
| **Notifications**            | Real-time in-app notification system with bell icon                |
| **Reviews**                  | Users can rate and review specific projects                        |
| **Review Modal**             | Star rating UI with animated hover states                          |
| **Admin Reviews**            | Publish/hide reviews from admin panel                              |
| **Admin Contacts**           | View, read, and reply to contact form messages                     |
| **Charts**                   | Recharts area chart + pie chart in admin dashboard                 |
| **Rate Limiting**            | In-memory rate limiter on all API routes                           |
| **Lightbox**                 | Full-screen image zoom on project detail page                      |
| **Image Gallery Navigation** | Arrow keys + thumbnail strip                                       |
| **Share Button**             | Native Web Share API with clipboard fallback                       |
| **Demo Credentials**         | Shown on login page for easy testing                               |
| **Animated Counters**        | IntersectionObserver-powered number counting                       |
| **Search Navigation**        | Search bar in navbar navigates to /projects?search=                |
| **Query Key Constants**      | Centralised QK object prevents cache key typos                     |
| **Auto cache invalidation**  | All mutations properly invalidate related queries                  |

---

## 📦 Tech Stack

### Frontend (Tailwind v4)

| Package                | Version   |
| ---------------------- | --------- |
| react                  | ^19.1.0   |
| @tailwindcss/vite      | ^4.1.4    |
| tailwindcss            | ^4.1.4    |
| @tanstack/react-router | ^1.114.23 |
| @tanstack/react-query  | ^5.72.2   |
| zustand                | ^5.0.3    |
| framer-motion          | ^12.6.3   |
| recharts               | ^2.15.3   |
| socket.io-client       | ^4.8.1    |

### Backend

| Package          | Version              |
| ---------------- | -------------------- |
| express          | ^5.1.0               |
| mongoose         | ^8.13.2              |
| socket.io        | ^4.8.1               |
| @imagekit/nodejs | ^7.3.0               |
| multer           | ^2.0.0 (v2 — no CVE) |

---

## 🗂️ Admin Panel Pages

| Page       | URL               | Features                |
| ---------- | ----------------- | ----------------------- |
| Dashboard  | /admin/           | KPIs, charts, live feed |
| Projects   | /admin/projects   | CRUD + ImageKit upload  |
| Quotations | /admin/quotations | Manage + send quotes    |
| Inbox      | /admin/chat       | Reply to all customers  |
| Users      | /admin/users      | Activate/deactivate     |
| Reviews    | /admin/reviews    | Publish/hide reviews    |
| Contacts   | /admin/contacts   | View contact messages   |

---

## 🔌 API Endpoints

| Method | Endpoint                             | Auth | Description       |
| ------ | ------------------------------------ | ---- | ----------------- |
| POST   | /api/auth/register                   | —    | Register          |
| POST   | /api/auth/login                      | —    | Login             |
| GET    | /api/projects                        | —    | List projects     |
| GET    | /api/projects/stats                  | —    | Stats             |
| POST   | /api/quotations                      | ✅   | Submit quote      |
| GET    | /api/quotations/my                   | ✅   | My quotes         |
| GET    | /api/chat/conversations              | ✅   | Conversations     |
| POST   | /api/chat/conversations/:id/messages | ✅   | Send message      |
| POST   | /api/contact                         | —    | Contact form      |
| GET    | /api/notifications                   | ✅   | Get notifications |
| PATCH  | /api/notifications/read-all          | ✅   | Mark all read     |
| POST   | /api/upload/single                   | ✅   | Upload image      |
| POST   | /api/reviews                         | ✅   | Submit review     |

---

## Deployment

### Frontend on Vercel

Project root: `frontend`

Build settings:

- Build command: `npm run build`
- Output directory: `dist`

Environment variables:

- `VITE_API_BASE_URL=https://master-pools-platform.onrender.com/api`
- `VITE_SOCKET_URL=https://master-pools-platform.onrender.com`

Temporary testing tip:

- If you need to quickly verify cross-origin connectivity while debugging, set this backend env on Render (temporary):
  - `ALLOW_ALL_ORIGINS=true`
    This makes the API accept requests from any origin (use only for short-term testing, then unset it).

`frontend/vercel.json` already includes SPA rewrites so client routes work after refresh.

### Backend on Render

This project includes `render.yaml` configured for backend deployment from `backend` only.

Required backend env vars on Render:

- `MONGODB_URI`
- `JWT_SECRET`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Recommended backend env vars:

- `CLIENT_URL=https://<your-vercel-domain>`
- `ALLOW_VERCEL_PREVIEWS=true`
- `SERVE_FRONTEND=false`

After deploy, test:

- `https://master-pools-platform.onrender.com/api/health`
  After deploy, if the frontend still shows CORS errors, set `CLIENT_URL` in the Render service environment to `https://www.masterspools.co.zw`, restart the service, then redeploy the frontend with the `VITE_*` vars above.
