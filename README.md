# VidyaSethu — Smart Education & Programme Management System

A full-stack EdTech platform designed to bridge the gap between students, institutions, and programme managers. Built as a scalable system with role-based dashboards, VidyaSethu enables seamless student onboarding, batch management, and performance tracking.

---

## Live URLs

| Service  | URL |
|----------|-----|
| Frontend | https://vidyasethu-frontend.vercel.app/ |
| Backend  | https://vidyasethu-backend.up.railway.app/ |
| API base | https://vidyasethu-backend.up.railway.app/api |

---

## Test Accounts

> Create these in Clerk first, then sign in and complete onboarding to pick a role. Programme Manager must be approved first to manage other users.

| Role               | Email                        | Password          | Notes |
|--------------------|------------------------------|-------------------|-------|
| Student            | student@vidyasethu.dev       | Vidya@123         | Auto-approved |
| Trainer            | trainer@vidyasethu.dev       | Vidya@123         | Approved by Institution |
| Institution        | institution@vidyasethu.dev   | Vidya@123         | Approved by Programme Manager |
| Programme Manager  | manager@vidyasethu.dev       | Vidya@123         | Seeded & auto-approved |
| Monitoring Officer | monitor@vidyasethu.dev       | Vidya@123         | Approved by Programme Manager |

---

## Approval Workflow

Every role except Student starts as `pending` and requires approval.

| Role               | Approved By |
|--------------------|-------------|
| Student            | Auto-approved |
| Trainer            | Institution |
| Institution        | Programme Manager |
| Programme Manager  | Existing Programme Manager |
| Monitoring Officer | Programme Manager |

**Workflow Order:**  
Bootstrap Programme Manager → Approve Institutions → Institutions approve Trainers → Students join via invite.

---

## Local Setup

### Prerequisites

- Node.js 18+
- Clerk account ([https://clerk.com](https://clerk.com))
- PostgreSQL DB ([https://neon.tech](https://neon.tech))

---

### 1. Database

```bash
cd backend
cp .env.example .env
npm install
node scripts/migrate.js

#2. Backend
cd backend
cp .env.example .env

#Fill .env:
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
CLERK_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
PORT=5000

#to run:
npm install
npm run dev

3. Seed Data
cd backend
npm run seed
4. Frontend
cd frontend
cp .env.example .env

Fill .env:

VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
npm install
npm run dev

Frontend runs on: http://localhost:5173

5. Running Tests
cd backend
npm test
API Endpoints

All endpoints require authentication unless specified.

Method	Path	Roles
GET	/api/auth/institutions	Public
POST	/api/auth/sync	All
GET	/api/auth/me	All
GET	/api/auth/requests	Institution, Manager
POST	/api/auth/requests/:id/approve	Institution, Manager
GET	/api/auth/users	Institution, Manager, Monitor
POST	/api/auth/provision	Institution, Manager
POST	/api/auth/users/:id/assign-role	Manager
POST	/api/batches	Trainer, Institution
GET	/api/batches	All
POST	/api/batches/:id/invite	Trainer, Institution
POST	/api/batches/:id/join	Student
POST	/api/batches/join-by-token	Student
GET	/api/batches/:id/summary	Institution, Manager, Monitor
POST	/api/sessions	Trainer
GET	/api/sessions	All
GET	/api/sessions/:id/attendance	Trainer, Institution, Manager, Monitor
POST	/api/attendance/mark	Student
GET	/api/institutions/:id/summary	Institution, Manager, Monitor
GET	/api/programme/summary	Manager, Monitor
Schema Decisions
Single users table with role-based access
Roles: student | trainer | institution | programme_manager | monitoring_officer
Approval system with pending | approved
Join tables for batches (batch_students, batch_trainers)
Invite token system for student onboarding
Attendance tracked per session with unique constraints
Cascade deletes for clean DB relationships
Tech Stack
Layer	Tech
Frontend	React + Vite
UI	Tailwind CSS
Backend	Node.js + Express
Auth	Clerk
Database	PostgreSQL
Testing	Jest + Supertest
Features
Multi-role dashboards
Secure authentication & role-based access
Batch creation & student enrollment
Session scheduling
Attendance tracking system
Analytics & reporting dashboards
Approval workflow system
Future Enhancements
AI-based student recommendations
Placement & internship tracking
Mobile application
Real-time notifications
Advanced analytics dashboards
Known Gaps
No invite token expiry
Limited input validation
No rate limiting
No email notification system
Attendance validation relies on frontend timing
One Improvement

Implement server-side validation for attendance timing to prevent misuse via direct API calls.

Tagline

“VidyaSethu — Bridging Knowledge to Success.”


---

If you want next level upgrade, I can:
- Add **badges (build, deploy, license)**
- Create **GitHub folder structure**
- Design **logo + UI theme**
- Generate **Cursor AI prompts to upgrade your project**

Just tell 👍