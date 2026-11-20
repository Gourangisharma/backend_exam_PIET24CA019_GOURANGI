# Backend Exit Test – Node.js, Express, MongoDB

**Name:** _<Your Name>_  **Register No:** _<Your Reg No>_

| File | Task |
|------|------|
| `file/A1.js` | Task 1 – Library Book Management API (CRUD, Mongoose) |
| `file/A2.js` | Task 2 – Student Portal (bcrypt, JWT, role-based access, helmet/cors/rate-limit) |
| `outputs/A1.png` | Task 1 output screenshot |
| `outputs/A2.png` | Task 2 output screenshot |

## Setup
```bash
npm install
cp .env.example .env      # set MongoDB URLs and JWT_SECRET
node file/A1.js           # Task 1 -> http://localhost:3000
node file/A2.js           # Task 2 -> http://localhost:4000
```

## Task 1 – Endpoints (port 3000)
| Method | URL | Success | Errors |
|---|---|---|---|
| POST | /books | 201 | 400 invalid input |
| GET | /books | 200 | – |
| GET | /books/:id | 200 | 400 bad id, 404 not found |
| PUT | /books/:id | 200 | 400, 404 |
| DELETE | /books/:id | 200 | 400, 404 |

Structure: `models/Book.js`, `routes/books.js`, `middleware/logger.js`, `middleware/errorHandler.js`, `file/A1.js` (server).

## Task 2 – Endpoints (port 4000)
| Method | URL | Access | Result |
|---|---|---|---|
| POST | /register | public | 201 / 400 validation / 409 duplicate email |
| POST | /login | public | 200 + JWT (1h) / 401 |
| GET | /profile | any logged-in user | 200 (no password) / 401 |
| GET | /students | admin only | 200 / 401 / 403 |

Security: `helmet`, `cors`, `express-rate-limit` (100 requests / 15 min), passwords hashed with bcrypt, JWT in `Authorization: Bearer <token>`.
