<div align="center">

# ✦ TRACKDOOR

### Track. Analyze. Take Control.

A modern full-stack personal finance dashboard built to make everyday money management clear, visual, and intelligent.

<br>

<a href="https://visionary-queijadas-526f9b.netlify.app/">
  <img src="https://img.shields.io/badge/%E2%96%B6%20_LIVE_DEMO-00C853?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo">
</a>
<a href="https://github.com/mohitjoshi-dev/trackdoor">
  <img src="https://img.shields.io/badge/%E2%98%85%20_GITHUB-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

<br><br>

<img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=22&duration=2800&pause=900&color=7C3AED&center=true&vCenter=true&width=700&lines=Track+every+expense.;Understand+where+your+money+goes.;Build+smarter+budgets.;Take+control+of+your+finances." alt="Typing animation">

<br><br>

</div>

✦ THE IDEA

TrackDoor is a full-stack personal finance application designed around one simple idea:

Your financial data should tell a story — not just show numbers.

Instead of relying on scattered notes, spreadsheets, or basic expense lists, TrackDoor brings transactions, budgets, analytics, preferences, authentication, and financial insights into one focused dashboard.

<div align="center">

💳 TRACK

📊 ANALYZE

🎯 CONTROL

Record income & expenses

Visualize spending patterns

Set and monitor budgets

Organize transactions

Interactive charts

Make informed decisions

</div>

⚡ TRACKDOOR IN ACTION

<div align="center">

<img src="./src/assets/trackdoor-demo.gif" width="950" alt="TrackDoor Product Demo">

<br>

<sub>🎥 Full product walkthrough — from dashboard navigation to financial analytics.</sub>

</div>

✨ WHAT MAKES IT DIFFERENT

<div align="center">

<table>
<tr>
<td width="50%" valign="top">

💸 Expense Intelligence

Track income and expenses with structured categories, dates, notes, and transaction history.

→ Know where your money actually goes.

</td>
<td width="50%" valign="top">

📈 Visual Analytics

Turn raw transactions into readable charts and spending patterns.

→ Numbers become understandable.

</td>
</tr>

<tr>
<td width="50%" valign="top">

🎯 Budget Management

Create budgets and keep an eye on spending against your limits.

→ Plan before you overspend.

</td>
<td width="50%" valign="top">

🤖 Intelligent Insights

Use financial data to surface useful patterns and insights.

→ Let your data explain itself.

</td>
</tr>

<tr>
<td width="50%" valign="top">

🔐 Secure Authentication

Supabase-powered authentication keeps accounts and financial data separated by user.

→ Your dashboard, your data.

</td>
<td width="50%" valign="top">

🎨 Personalization

Light, Midnight, and AMOLED themes plus currency, language, and timezone preferences.

→ Make the experience yours.

</td>
</tr>
</table>

</div>

🧩 CORE FEATURES

Expense & Income Tracking

Add, edit, delete, and organize transactions

Category-based financial organization

Transaction history and summaries

Interactive Dashboard

Financial overview at a glance

Income vs expense breakdown

Spending trends and category distribution

Budget Management

Create and manage budgets

Track spending against planned limits

Monitor category-level performance

Analytics

Pie charts

Bar charts

Category analysis

Spending patterns

Authentication

Sign up / sign in

Email verification

Supabase authentication

Personalization

Light mode

Midnight mode

AMOLED mode

Currency preferences

Language preferences

Timezone preferences

Data Portability

Export financial data

Import previously exported data

🖥️ DASHBOARD AT A GLANCE

Module

Purpose

Dashboard

High-level financial overview

Transactions

Manage income and expenses

Budgets

Plan and monitor spending

Analytics

Understand financial patterns

Categories

Organize transactions

Settings

Customize the application

Profile

Manage account information

AI Insights

Surface useful financial patterns

🧠 THE TECH BEHIND IT

<div align="center">

Frontend

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111827">
<img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8">

UI & Visualization

<img src="https://img.shields.io/badge/shadcn%2Fui-111827?style=for-the-badge&logo=shadcnui&logoColor=white">
<img src="https://img.shields.io/badge/Recharts-111827?style=for-the-badge&logo=chartdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Lucide-111827?style=for-the-badge&logo=lucide&logoColor=white">

Backend & Deployment

<img src="https://img.shields.io/badge/Supabase-111827?style=for-the-badge&logo=supabase&logoColor=3ECF8E">
<img src="https://img.shields.io/badge/Netlify-111827?style=for-the-badge&logo=netlify&logoColor=00C7B7">
<img src="https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white">

</div>

🏗️ ARCHITECTURE

                         ┌─────────────────────────┐
                         │        TRACKDOOR        │
                         │     React + Vite UI     │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌────────────┐    ┌────────────┐    ┌────────────┐
             │ Dashboard  │    │ Analytics  │    │  Settings  │
             └──────┬─────┘    └──────┬─────┘    └──────┬─────┘
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Supabase          │
                         │ Auth + Database + Data  │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Financial Data      │
                         │ Transactions / Budgets  │
                         │ Categories / Profiles   │
                         └─────────────────────────┘

📁 PROJECT STRUCTURE

TrackDoor/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── scenes/
│   │   ├── hero.png
│   │   ├── logo.svg
│   │   └── trackdoor-demo.gif
│   │
│   ├── components/
│   ├── pages/
│   ├── ...
│   └── main.jsx
│
├── supabase/
│
├── .env
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

🚀 RUN IT LOCALLY

1. Clone

git clone https://github.com/mohitjoshi-dev/trackdoor.git
cd trackdoor

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

If your enabled AI functionality requires an additional environment variable, add it according to the corresponding implementation.

4. Start the development server

npm run dev

Then open the local URL shown by Vite.

🔐 SECURITY

TrackDoor keeps sensitive configuration outside the public source code.

Environment variables are used for service configuration.

Supabase handles authentication.

Secret keys should never be committed to GitHub.

.env is excluded through .gitignore.

Database access should be protected using appropriate Supabase policies.

Never expose private API keys or service-role credentials in frontend code.

🎨 DESIGN DIRECTION

TrackDoor follows a dashboard-first visual language focused on:

┌─────────────────────────────────────────────────────┐
│                                                     │
│     DARK UI       GLASS EFFECTS       SOFT GLOW     │
│                                                     │
│     CLEAN TYPE    DATA VISUALS        MICRO UX      │
│                                                     │
└─────────────────────────────────────────────────────┘

Visual principles

Minimal visual noise

Strong information hierarchy

Responsive dashboard layouts

Dark-mode-first aesthetics

Glassmorphism-inspired surfaces

Subtle gradients and glow

Data visualization over decoration

Fast interactions over unnecessary animation

🛣️ ROADMAP

✅ Completed

Authentication

Transaction management

Budget management

Analytics dashboard

Category management

Theme system

Currency preferences

Language preferences

Timezone preferences

Import / export

Supabase integration

Production deployment

🔭 Next

More advanced financial insights

Improved currency conversion across the application

Deeper spending predictions

Recurring transactions

More analytics views

Enhanced mobile experience

🧪 WHAT I LEARNED BUILDING TRACKDOOR

This project was built as more than a UI exercise.

It involved working with:

React application architecture

Reusable component design

Tailwind CSS

shadcn/ui

State and data management

Authentication flows

Supabase database integration

Environment variables

Data import/export

Chart-based analytics

Responsive dashboard design

Production deployment

Git and GitHub workflows

The goal was to build something that feels like a real product, not just a college project.

🌐 LIVE PROJECT

<div align="center">

Try TrackDoor

<a href="https://visionary-queijadas-526f9b.netlify.app/">
<img src="https://img.shields.io/badge/OPEN_TRACKDOOR-7C3AED?style=for-the-badge&logo=netlify&logoColor=white" alt="Open TrackDoor">
</a>

<br><br>

<sub>Live deployment powered by Netlify.</sub>

</div>

📊 PROJECT SNAPSHOT

<div align="center">

⚛️ Frontend

🗄️ Backend

📊 Analytics

🔐 Auth

🚀 Deploy

React + Vite

Supabase

Recharts

Supabase Auth

Netlify

</div>

👨‍💻 BUILT BY

<div align="center">

Mohit Joshi

B.Tech Information Technology • Frontend / Full-Stack Developer

<br>

<a href="https://github.com/mohitjoshi-dev">
  <img src="https://img.shields.io/badge/GitHub-mohitjoshi--dev-111827?style=for-the-badge&logo=github&logoColor=white">
</a>

</div>

⭐ IF YOU LIKE IT

If TrackDoor helped you, inspired you, or you simply like the project:

⭐ Star the repository

🍴 Fork it

💬 Share feedback

Every bit of support helps.

<div align="center">

Track. Analyze. Take Control.

<img src="https://capsule-render.vercel.app/api?type=waving&color=7C3AED&height=100&section=footer" width="100%" alt="Footer">

</div>