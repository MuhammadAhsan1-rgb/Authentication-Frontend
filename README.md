# Token Authentication - Frontend

A React frontend for a Django REST backend that uses token-based authentication. Users can register, log in to receive an auth token, and view protected data on a dashboard.

> **Status:** Not deployed yet. Currently runs locally against the Django backend.

## Features

- User registration (username, email, password)
- Login with token authentication
- Protected dashboard that fetches data using the auth token
- Automatic logout when the API returns `401 Unauthorized`
- Dashboard shows each record (name, age, hobby) as a card
- Responsive layout: 1 column on mobile, 2 on tablet, 3 on desktop
- Dark theme styled with Tailwind CSS
- Backend URL configured through an environment variable

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Backend: Django REST Framework (separate project)

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/      # Login, Register, Dashboard
│   ├── API.jsx          # API endpoint URLs
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- The Django backend running locally (default `http://localhost:8000`)

### Installation

```bash
git clone https://github.com/MuhammadAhsan1-rgb/frontend.git
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

If `VITE_API_URL` is not set, the app falls back to `http://localhost:8000`. Do not add a trailing slash.

### Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## API Endpoints Used

All endpoints are built from `VITE_API_URL` in `src/API.jsx`:

| Purpose            | Method | Endpoint           |
| ------------------ | ------ | ------------------ |
| Get auth token     | POST   | `/get-auth-token/` |
| Register           | POST   | `/api/register/`   |
| Fetch user details | GET    | `/api/details/`    |

Authenticated requests send the token in the header:

```
Authorization: Token <your-token>
```

The details endpoint is expected to return a list of objects with `id`, `name`, `age` and `hobby`.

## Backend Requirements

The Django backend must allow requests from the frontend origin. With `django-cors-headers`, add the frontend URL to `CORS_ALLOWED_ORIGINS`, for example `http://localhost:5173`.

## Deployment (Planned)

The frontend is intended to be deployed on Vercel and the backend on a Python host.

1. Deploy the backend and note its URL.
2. Import this repository in Vercel (framework preset: Vite).
3. Set `VITE_API_URL` to the backend URL and deploy.
4. Add the Vercel URL to the backend's `CORS_ALLOWED_ORIGINS`.

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |

## Author

Muhammad Ahsan - [@MuhammadAhsan1-rgb](https://github.com/MuhammadAhsan1-rgb)
