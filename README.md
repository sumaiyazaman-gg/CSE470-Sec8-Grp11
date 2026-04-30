# Student Campus Portal (SCP)

A full-stack web application for university students to submit requests, book facilities, view announcements and events, and provide feedback.

---

## Tech Stack
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Auth**: JWT (JSON Web Tokens)
- **Frontend**: Vanilla HTML/CSS/JS

---

## Setup

### 1. Database
Install MySQL locally and start the MySQL server before running the project.

```bash
mysql -u root -p < db.sql
```

If you want to override the default DB connection settings, copy `.env.example` to `.env` and update the values.

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
npm start
# or for development with auto-restart:
npm run dev
```

### 4. Open in browser
- Login page: `http://localhost:3000/login.html`
- Dashboard:  `http://localhost:3000/dashboard.html`
- Admin:      `http://localhost:3000/admin.html`

---

## Default Admin Account
| Field    | Value                        |
|----------|------------------------------|
| Email    | admin@university.edu.bd      |
| Password | admin123                     |

---

## Features

### Student
- Register / Login with university email (@university.edu.bd)
- Submit requests with image upload (category, title, description)
- View own requests + status updates + admin notes
- Book facilities with time slots (conflict detection)
- Cancel bookings
- View and leave feedback (star rating + comment) on completed requests
- Browse announcements (with priority levels)
- View upcoming events

### Admin
- Dashboard with live stats (requests, users, bookings, avg rating)
- View and filter all requests
- Update request status (Pending / In Progress / Completed / Rejected)
- Add admin notes to requests
- View all bookings
- Post and delete announcements (Normal / High / Urgent priority)
- Create and delete events
- View all student feedback
- View all registered users

---

## Security
- JWT authentication on all protected routes
- Admin routes protected by role check
- File upload restricted to images only (jpg, png, gif, webp), max 5MB
- Passwords stored as-is (upgrade to bcrypt for production)
- Parameterized SQL queries (no SQL injection)

---

## Production Notes
1. Change `JWT_SECRET` in `server.js` to a strong random string
2. Hash passwords with `bcrypt` instead of plain text
3. Set a real MySQL password
4. Use environment variables (`.env`) for secrets
5. Add HTTPS / reverse proxy (nginx)
