# Smart Bookmark App

## Live Demo
https://smart-bookmark-app-sigma-snowy.vercel.app

## GitHub Repository
https://github.com/Aasifmohammed0098/smart-bookmark-app

---

## Project Overview

Smart Bookmark App is a full-stack web application that allows users to securely save and manage personal bookmarks.

Users can:

- Sign in using Google OAuth
- Add bookmarks (title + URL)
- View their own bookmarks
- Delete their bookmarks
- See real-time updates without refreshing
- Access their data securely (private per user)

---

## Tech Stack

Frontend:
- Next.js 16 (App Router)
- React
- Tailwind CSS

Backend:
- Supabase Authentication
- Supabase Database
- Supabase Realtime

Deployment:
- Vercel

---

## Features

- Google login
- Add bookmark
- Delete bookmark
- Private bookmarks per user
- Real-time updates
- Secure database using Row Level Security
- Live deployed app

---

## Problems Faced and Solutions

Problem: Google login not working after deployment  
Solution: Added correct redirect URL in Supabase Authentication settings  

Problem: Delete bookmark not working  
Solution: Created DELETE policy using auth.uid() = user_id  

Problem: Components folder error  
Solution: Created components folder in correct project root location  

Problem: Real-time updates not working  
Solution: Used Supabase realtime subscription  

---

## Run locally

```
npm install
npm run dev
```

---

## Author

Mohammed Aasif  
GitHub: https://github.com/Aasifmohammed0098
