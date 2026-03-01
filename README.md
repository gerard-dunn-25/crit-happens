# 🎲 Crit Happens!

A fantasy dice roller built with React, TypeScript and FastAPI. Roll polyhedral dice, watch them spin to reveal, and celebrate your critical hits!

---

## Features

- Roll d4, d6, d8, d10, d12 and d20 dice
- Roll up to 6 dice at a time
- Animated dice spin and staggered reveal
- Critical hit detection with themed icons
- Dark and light mode themes
- Responsive mobile-first design

---

## Tech Stack

**Frontend**

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- React Icons

**Backend**

- Python 3.11+
- FastAPI
- Pydantic
- Uvicorn

**Testing**

- Vitest + React Testing Library (frontend)
- pytest + httpx (backend)

---

## Project Structure

```
crit-happens/
├── frontend/
│   ├── src/
│   │   ├── assets/dice/
│   │   │   ├── blank/       # SVG dice for board display
│   │   │   └── numbered/    # SVG dice for dropdown selector
│   │   ├── components/
│   │   │   ├── Board.tsx
│   │   │   ├── Dice.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── Results.tsx
│   │   ├── context/
│   │   │   ├── ThemeContext.ts
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── useTheme.ts
│   │   ├── utils/
│   │   │   └── diceShapes.ts
│   │   └── types/
│   │       ├── index.ts
│   │       └── components.ts
│   └── package.json
├── backend/
│   ├── main.py
│   └── test_main.py
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- pip

### Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

The API will be running at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## API Endpoints

### `GET /`

Health check.

### `GET /dice-types`

Returns the list of supported dice types.

```json
{
  "dice_types": [4, 6, 8, 10, 12, 20]
}
```

### `POST /roll`

Roll dice and return results.

**Request:**

```json
{
  "dice_type": 20,
  "num_dice": 2
}
```

**Response:**

```json
{
  "rolls": [15, 20],
  "critical_rolls": [false, true],
  "total": 35
}
```

---

## Running Tests

### Backend

```bash
cd backend
pip install pytest httpx
pytest test_main.py -v
```

### Frontend

```bash
cd frontend
npm test
```

---

## CI/CD

GitHub Actions runs on every push and pull request to `main`:

- Backend tests via pytest
- Frontend tests via Vitest
- Production build check

---

## Deployment

- **Frontend** — Vercel
- **Backend** — Railway

---

## License

MIT
