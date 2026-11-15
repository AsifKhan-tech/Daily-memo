# Daily Memo Frontend

Daily Memo is a responsive React application for capturing and managing todos. It also includes account registration and login, email verification, password recovery, a protected profile, and a contact form.

## Technology

- React 19
- React Router
- Vite
- Joi for client-side validation

## Prerequisites

- Node.js 22 or newer
- pnpm 12 or newer
- The Daily Memo API running locally for authentication, todo storage, and contact form features

The API also requires a running MongoDB instance. See the [server setup guide](../server/Readme.md) for database, SMTP, and API configuration.

## Run locally

Start and configure the API first. Its `CLIENT_URL` should be `http://localhost:5173` so the browser can make credentialed requests to the API.

Then, from the repository root, install the frontend dependencies:

```bash
cd frontend
pnpm install
```

Start Vite:

```bash
pnpm dev
```

Open the URL printed in the terminal, usually `http://localhost:5173`.

The frontend connects to `http://localhost:3000/api/v1` by default. To use a different API URL, create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Restart the Vite server after changing environment variables. Do not commit local environment files or credentials.

## Available commands

Run these commands from the `frontend` directory:

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start the Vite development server    |
| `pnpm build`   | Build the frontend into `dist/`      |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint`    | Run ESLint                           |

## Project structure

```text
src/
  components/   Shared layout and UI components
  features/     Authentication, contact, and todo features
  hooks/        Shared React hooks
  lib/          API client, configuration, and utilities
  styles/       Base, component, theme, and responsive styles
```

## Contact

- [Email](asifjamshed4@gmail.com)

- [LinkedIn](https://www.linkedin.com/in/mohd-asif-39a4ba27b/)

- [X / Twitter](https://x.com/asifdotcom_1)

- [GitHub](https://github.com/AsifKhan-tech)
