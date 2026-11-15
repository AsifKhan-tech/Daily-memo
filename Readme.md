# Daily Memo

Daily Memo is a full-stack task and memo app. Capture and manage todos, create an account to use protected features, and send a message through the contact form.

## Features

- Create, edit, complete, select, and delete todos
- Register and log in, verify an email address, and recover a password
- View a protected profile and maintain an authenticated session
- Submit contact messages
- Responsive React interface backed by an Express API and MongoDB

## Tech stack

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express, Mongoose, JWT, Nodemailer
- **Database:** MongoDB

## Project layout

```text
frontend/   React application
server/     Express API and MongoDB models
```

The API is served under `/api/v1` and provides authentication, todo, and contact routes. The `/health` endpoint can be used to check the API.

## Run locally

### Prerequisites

- Node.js 22 or newer
- pnpm 12 or newer
- MongoDB running locally, or a MongoDB connection URI
- SMTP credentials for email verification and password recovery

Install the project's pnpm version if needed:

```bash
npm install --global pnpm@12.15.0
```

### Configure the API

Create the server's environment file:

```bash
cp server/env.example server/.env
```

Edit `server/.env` and set at least:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/daily-memo

JWT_ACCESS_SECRET=<generate-a-unique-secret>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=<generate-a-different-unique-secret>
JWT_REFRESH_EXPIRES_IN=7d

SMTP_HOST=<your-smtp-host>
SMTP_PORT=587
SMTP_USER=<your-smtp-username>
SMTP_PASS=<your-smtp-password>
SMTP_FROM_NAME=Daily Memo
SMTP_FROM_EMAIL=<sender-email-address>

CLIENT_URL=http://localhost:5173
```

Use unique, private values for both JWT secrets. Configure SMTP with a provider you can access; email verification and password recovery require a working SMTP account. `MONGODB_URI` must point to a running MongoDB instance. The `MONGO_USER` and `MONGO_PASS` entries in the sample file are not needed when connecting to an unauthenticated local MongoDB.

### Install and start

In one terminal, install dependencies and start the API:

```bash
cd server
pnpm install
pnpm dev
```

The API runs at `http://localhost:3000`. Check `http://localhost:3000/health` to confirm it has started.

In another terminal, install dependencies and start the frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`). The frontend uses `http://localhost:3000/api/v1` by default. If you change the API address, set `VITE_API_BASE_URL` in `frontend/.env`, for example:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Keep the API's `CLIENT_URL` in sync with the frontend's origin; it controls CORS and the links generated for account emails.

## Useful commands

Run these from the relevant project directory:

```bash
pnpm dev       # Start the frontend or API development server
pnpm build     # Build the frontend (frontend only)
pnpm lint      # Lint the frontend (frontend only)
```

## Contact

- [Email](asifjamshed4@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/mohd-asif-39a4ba27b/)
- [GitHub](https://github.com/AsifKhan-tech)
- [X / Twitter](https://x.com/asifdotcom_1)
- [Instagram](https://www.instagram.com/asifdotcom_1/)
