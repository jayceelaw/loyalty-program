# CSC309-project

## 1. Technology Stack  
| Layer | Technology | Description |
|--------|-------------|-------------|
| Front-End | React, NextJS / HTML / CSS / NodeJS | User interface and component rendering |
| Back-End | NodeJS + Express | Server-side logic and API endpoints |
| Database | SQLite3 | Persistent data storage |
| Version Control | Git / GitHub | Repository management and collaboration |
| Deployment | TBD |

*Technologies will be refined and finalized as the project progresses.*

---

## 2. Repo Structure
```
course-project/
├── backend/                        # Existing backend (do NOT change)
│   ├── .gitignore
│   ├── .gitkeep
│   ├── .gitkeep copy
│   ├── ai.txt
│   ├── collaboration.txt
│   ├── index.js
│   ├── package.json
│   ├── README.md
│   ├── middleware/
│   │   ├── jwtAuth.js
│   │   └── verifyInput.js
│   ├── prisma/
│   │   ├── .gitkeep
│   │   ├── createsu.js
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── routes/
│       ├── auth.js
│       ├── events.js
│       ├── promotions.js
│       └── transactions.js
│
├── frontend/                        # Next.js frontend
│   ├── .gitignore
│   ├── package.json
│   ├── next.config.js
│   ├── public/                      # Static assets
│   │   ├── favicon.ico
│   └── src/
│       ├── app/                      # Next.js App Router
│       │   ├── layout.js             # Root layout (navbar/footer)
│       │   ├── page.js               # Home/login page
│       │
│       │   ├── user/                 # Regular user pages
│       │   │   ├── page.js           # Dashboard
│       │   │   ├── points.js
│       │   │   ├── qr.js
│       │   │   ├── transfer.js
│       │   │   ├── redeem.js
│       │   │   └── redeem-qr.js
│       │
│       │   ├── event/                # Event-related pages (shared across roles)
│       │   │   ├── page.js           # List of events
│       │   │   ├── create.js         # Manager/Organizer only
│       │   │   ├── [id]/page.js      # Event details / RSVP
│       │   │   ├── [id]/edit.js      # Manager/Organizer only
│       │   │   └── [id]/award.js     # Organizer only
│       │
│       │   ├── transaction/          # Transaction pages
│       │   │   ├── page.js           # List of transactions
│       │   │   ├── create.js         # Cashier only
│       │   │   └── redeem.js         # Cashier only
│       │
│       │   ├── promotion/            # Promotion pages
│       │   │   ├── page.js           # List of promotions
│       │   │   └── create.js         # Manager only
│       │
│       │   └── superuser/            # Superuser-specific pages
│       │       ├── page.js
│       │       └── roles.js
│       │
│       ├    ── components/               # Shared UI components
│       │
│       ├── lib/                      # Helper functions & API calls
│       │   ├── api.js
│       │   ├── users.js
│       │   ├── events.js
│       │   ├── promotions.js
│       │   └── transactions.js
│       │
│       ├── context/                  # React Context for global state
│       │   ├── AuthContext.jsx
│       │   └── UserContext.jsx
│
├── README.md                         # Project overview

```

## 3. Acknowledgment  

## Team Members
- Lavender
- Kristen
- Christina
- Jaycee

This project is developed as part of the **University of Toronto CSC309 Web Development** course.  