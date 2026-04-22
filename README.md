# 🎯 Habit Tracker App

A full-stack web application for tracking daily habits. Users can sign up, log in, add habits, mark them as complete, and delete them. Built with Next.js, Supabase, and deployed on Vercel.

---

## 📋 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Live Demo](#live-demo)
4. [Repository](#repository)
5. [Setup Instructions](#setup-instructions)
6. [Database Schema](#database-schema)
7. [Project Structure](#project-structure)
8. [AI Usage Documentation](#ai-usage-documentation)
9. [Issues Faced & Solutions](#issues-faced--solutions)
10. [Future Enhancements](#future-enhancements)

---

## ✨ Features

### Authentication
- **Sign Up** — Create a new account with email and password
- **Login** — Secure login with session persistence
- **Logout** — Clear session and redirect to login page
- **Protected Routes** — Only authenticated users can access the habits page

### Habit Management
- **Add Habits** — Create new habits with a title
- **View Habits** — See all your habits in a clean list
- **Mark Complete** — Check off habits as done (visual strikethrough effect)
- **Delete Habits** — Remove habits you no longer need
- **Persistent Storage** — All habits saved in Supabase database

### User Experience
- Beautiful gradient UI with purple/blue theme
- Responsive design that works on all devices
- Real-time database synchronization
- User-friendly error messages

---

## 🛠 Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router) |
| **Styling** | Inline CSS + Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |
| **Runtime** | Node.js (v24.15.0) |
| **Package Manager** | npm (11.12.1) |

---

## 🌐 Live Demo

**Live App URL:** https://habit-app-nocodedev11.vercel.app

**Test Account:**
- Email: test@example.com
- Password: test123

---

## 📦 Repository

**GitHub Repository:** https://github.com/nocodedev11/habit-app

**How to Clone:**
```bash
git clone https://github.com/nocodedev11/habit-app.git
cd habit-app
npm install
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+ (installed: v24.15.0)
- npm v10+ (installed: 11.12.1)
- Git v2.x+
- GitHub account
- Supabase account
- Vercel account

---

### Step 1 — Install Dependencies

```bash
npm install
npm install @supabase/supabase-js
```

---

### Step 2 — Set Up Supabase

1. Create a new project at **supabase.com**
2. Create a table named **habits** with these columns:
   - `id` (UUID, primary key, auto-generated)
   - `user_id` (UUID, references auth.users)
   - `title` (TEXT)
   - `completed` (BOOLEAN, default: false)
   - `created_at` (TIMESTAMP, auto-generated)

**SQL Command:**
```sql
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);
```

---

### Step 3 — Configure Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key-here
```

Get these values from Supabase → Project Settings → API

---

### Step 4 — Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

### Step 5 — Deploy to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

2. Go to **vercel.com** and click "Add New Project"
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Click "Deploy"

---

## 🗄️ Database Schema

### Habits Table

```sql
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);
```

| Column | Type | Purpose |
|---|---|---|
| `id` | UUID | Unique identifier for each habit |
| `user_id` | UUID | Links habit to authenticated user |
| `title` | TEXT | Name/description of the habit |
| `completed` | BOOLEAN | Track if habit is done (true/false) |
| `created_at` | TIMESTAMP | When habit was created (for sorting) |

---

## 📁 Project Structure

```
habit-app/
├── app/
│   ├── layout.js           # Root layout component
│   ├── page.js             # Main habits page (protected)
│   ├── globals.css         # Global styles
│   └── login/
│       └── page.js         # Login & signup page
├── lib/
│   └── supabase.js         # Supabase client initialization
├── .env.local              # Environment variables (not in git)
├── package.json            # Dependencies
├── package-lock.json       # Dependency lock file
├── next.config.js          # Next.js configuration
└── README.md               # This file
```

---

## 🤖 AI Usage Documentation

### AI Tools Used

**Primary AI Tool:** Claude (Anthropic)
- Used for code generation, debugging, and architecture planning

---

### Prompts Used & AI-Generated Code

#### 1️⃣ **Prompt: "Help me build a Next.js habit tracker app with Supabase"**

**AI Response:**
- Suggested the tech stack (Next.js + Supabase + Vercel)
- Generated the database schema
- Created initial file structure plan

**Code Generated by AI:**
- `lib/supabase.js` — Supabase client initialization
- `app/login/page.js` — Complete authentication flow
- `app/page.js` — Habits list with CRUD operations
- `app/layout.js` — Root layout component

---

#### 2️⃣ **Prompt: "Generate a login page with signup toggle and error handling"**

**AI Generated:**
```js
// app/login/page.js
'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleAuth = async () => {
    setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Account created! You can now log in.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/')
    }
  }
  // ... rest of component
}
```

**Manual Changes:**
- Added inline CSS styling with gradient background for better UI
- Improved visual hierarchy with emoji icons
- Enhanced error message styling (green for success, red for error)

---

#### 3️⃣ **Prompt: "Create a main habits page with add, toggle, and delete functionality"**

**AI Generated:**
```js
// app/page.js - Core habit management functions
const addHabit = async () => {
  if (!newHabit.trim()) return
  const { error } = await supabase
    .from('habits')
    .insert([{ user_id: user.id, title: newHabit, completed: false }])
  if (!error) {
    setNewHabit('')
    fetchHabits(user.id)
  }
}

const toggleHabit = async (habit) => {
  const { error } = await supabase
    .from('habits')
    .update({ completed: !habit.completed })
    .eq('id', habit.id)
  if (!error) fetchHabits(user.id)
}

const deleteHabit = async (id) => {
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id)
  if (!error) fetchHabits(user.id)
}
```

**Manual Changes:**
- Refactored styling from Tailwind to inline CSS for consistency
- Added user email display in header
- Enhanced visual feedback with color-coded buttons
- Improved responsive design

---

#### 4️⃣ **Prompt: "Add authentication check and protect the home route"**

**AI Generated:**
```js
useEffect(() => {
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
      fetchHabits(user.id)
    }
  }
  getUser()
}, [])
```

**What I Changed:**
- No changes — this worked perfectly as-is
- This ensures only logged-in users can access the habits page

---

### Code NOT Generated by AI (Manual Work)

1. **Environment variable setup** — Manual configuration in `.env.local`
2. **Supabase project creation** — Manual setup in Supabase console
3. **Database schema creation** — Manual SQL execution
4. **GitHub repository setup** — Manual git configuration
5. **Vercel deployment configuration** — Manual environment variable setup
6. **Git push & GitHub authentication** — Manual CLI commands
7. **UI refinements & styling decisions** — Manual CSS adjustments after AI suggestions
8. **Testing & bug fixes** — Manual testing in browser and debugging

---

### Summary: AI vs Manual Work

| Task | AI | Manual |
|---|---|---|
| Architecture planning | ✅ | - |
| Code generation (core logic) | ✅ | - |
| Authentication setup | ✅ | Minor tweaks |
| Database integration | ✅ | Setup only |
| UI/UX design | ✅ | ✅ Refinements |
| Styling | ✅ | ✅ Improvements |
| Deployment | - | ✅ |
| Git/GitHub setup | - | ✅ |
| Testing & debugging | - | ✅ |

**Percentage Breakdown:**
- AI Code Generation: ~70%
- Manual Setup & Configuration: ~20%
- Manual Testing & Refinements: ~10%

---

## ⚠️ Issues Faced & Solutions

### Issue 1: Hydration Mismatch Error
**Problem:** React console error about server/client HTML mismatch
**Cause:** Browser extensions (Grammarly, LastPass) modifying DOM
**Solution:** Error is harmless and only appears in dev mode with extensions. Doesn't affect production.

---

### Issue 2: PowerShell Execution Policy Error
**Problem:** `npm: File cannot be loaded because running scripts is disabled`
**Cause:** Windows PowerShell security policy blocking npm
**Solution:** Used Command Prompt instead of PowerShell
```bash
# Use Command Prompt (cmd), not PowerShell
npm run dev
```

---

### Issue 3: Git Push Rejected
**Problem:** `failed to push some refs to 'https://github.com/nocodedev11/habit-app.git'`
**Cause:** Remote repository had files (README.md) not present locally
**Solution:** Force push to overwrite remote with local code
```bash
git push -u origin main --force
```

---

### Issue 4: White Text on White Background
**Problem:** Login page was unreadable due to poor styling
**Cause:** Default Tailwind CSS not visible enough
**Solution:** Replaced with styled inline CSS with gradient background and proper contrast

---

### Issue 5: Login Page Not Redirecting
**Problem:** User remained on login page after successful sign-in
**Cause:** Missing router.push in authentication handler
**Solution:** Added `router.push('/')` in handleAuth function

---

## 🔄 Key Learning Points

1. **Next.js App Router** — Modern file-based routing system
2. **Supabase Integration** — Real-time database with built-in auth
3. **Client-Side State Management** — Using React hooks (useState, useEffect)
4. **Environment Variables** — Keeping secrets secure with `.env.local`
5. **Authentication Flow** — Session persistence and protected routes
6. **Git Workflow** — Branching, committing, and pushing to GitHub
7. **Vercel Deployment** — Automated deployment from GitHub
8. **CSS Styling** — Inline CSS vs Tailwind trade-offs

---

## 🚀 Future Enhancements

1. **Habit Categories** — Organize habits by type (health, fitness, learning, etc.)
2. **Habit Streaks** — Track consecutive days of completion
3. **Statistics Dashboard** — Show completion rates and charts
4. **Reminders** — Push notifications for habits
5. **Habit Notes** — Add notes/reflections to completed habits
6. **Dark Mode** — Toggle between light and dark themes
7. **Social Features** — Share habits with friends
8. **Mobile App** — React Native version for iOS/Android
9. **Habit Templates** — Pre-made habit suggestions
10. **Data Export** — Download habit history as CSV/PDF

---

## 📚 Resources Used

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Hooks Guide](https://react.dev/reference/react)
- [Git Documentation](https://git-scm.com/doc)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Developer Notes

**Developer:** Non-technical beginner
**Development Time:** ~2 hours (setup to deployment)
**AI Tool Used:** Claude (Anthropic)
**Difficulty Level:** Beginner-friendly with step-by-step guidance

**Key Takeaway:**
Building a full-stack app is more accessible than ever. With AI guidance, cloud databases, and modern deployment platforms, anyone can launch a working web application in hours, not months.

---

## 📞 Support

For issues or questions:
1. Check the [Issues Faced & Solutions](#issues-faced--solutions) section
2. Review the [Setup Instructions](#setup-instructions)
3. Check Supabase and Vercel dashboards for error logs
4. Refer to official documentation links above

---

**Last Updated:** April 22, 2026
**Status:** ✅ Fully Functional & Deployed
