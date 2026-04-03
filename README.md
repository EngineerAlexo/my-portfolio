# Professional Portfolio

A modern personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Firebase Authentication, Firestore, and a markdown-based blog.

## Features

- Responsive landing page with hero, about, projects, blog preview, and contact sections
- Sticky navbar with active section highlighting and smooth scrolling
- Dark and light mode toggle with `next-themes`
- Firestore-backed contact form and dynamic project loading
- Protected admin dashboard with Google sign-in for project management
- Markdown blog with static routes
- SEO metadata, OpenGraph image, sitemap, robots file, and image optimization
- Vercel Analytics integration

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Firebase Auth and Firestore
- React Hook Form + Zod

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in your Firebase values:

```bash
Copy-Item .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Use `.env.example` as the template.

Required Firebase variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Optional:

- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ADMIN_EMAILS`
- `NEXT_OUTPUT`

If Firebase variables are missing, the site still renders using local fallback content, but sign-in, Firestore messages, and dashboard writes remain disabled until you add your real config.

## Profile Image

- The site currently uses the built-in placeholder at `public/profile-photo.svg`
- If you want to use your real image, put it in `public/` and update `profileImage` in `src/data/site.ts`
- Example: `profileImage: "/my-photo.jpg"`

## Firebase Setup

1. Create a Firebase project.
2. Enable Google Authentication in Firebase Authentication.
3. Create a Firestore database in production mode.
4. Copy your web app config into `.env.local`.
5. Update `firestore.rules`:
   Replace `you@example.com` with your real admin email before deploying rules.
6. Publish the rules:

```bash
firebase deploy --only firestore:rules
```

## Admin Dashboard

- Visit `/admin`
- Sign in with Google
- Make sure your email is included in `NEXT_PUBLIC_ADMIN_EMAILS`
- Add, edit, or delete Firestore project entries

## Blog Authoring

- Blog posts live in `src/content/blog`
- Add a new `.md` file with frontmatter:

```md
---
title: "Post title"
description: "Short summary"
publishedAt: "2026-04-01"
tags:
  - Next.js
  - Portfolio
---

Your markdown content here.
```

## Deployment On Vercel (Step By Step)

Follow these exact steps to host your portfolio:

1. Prepare your project locally:
   - Make sure your app works with:
   ```bash
   npm install
   npm run build
   ```

2. Push code to GitHub:
   - If your project is not in GitHub yet, use:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

3. Sign in to Vercel:
   - Go to [https://vercel.com](https://vercel.com)
   - Click `Sign up` / `Log in` with GitHub

4. Import your repository:
   - In Vercel dashboard click `Add New...` -> `Project`
   - Select your GitHub repo
   - Click `Import`

5. Confirm build settings:
   - Framework Preset: `Next.js` (auto-detected)
   - Build Command: `next build` (default)
   - Output Directory: leave default

6. Add Environment Variables (required):
   - In Vercel project settings, open `Environment Variables`
   - Add the same values from your local `.env.local`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_ADMIN_EMAILS`
   - Optional:
     - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
     - `NEXT_OUTPUT` (leave empty for normal Vercel hosting)

7. Deploy:
   - Click `Deploy`
   - Wait for build to finish
   - Open the generated `*.vercel.app` URL

8. Set production site URL:
   - Copy your deployed URL, for example:
     - `https://your-portfolio.vercel.app`
   - Add/update:
     - `NEXT_PUBLIC_SITE_URL=https://your-portfolio.vercel.app`
   - Redeploy once so metadata, sitemap, and OG links use the correct domain

9. (Optional) Connect custom domain:
   - Vercel Project -> `Settings` -> `Domains`
   - Add your domain and follow DNS instructions
   - Update `NEXT_PUBLIC_SITE_URL` to that custom domain and redeploy

## GitHub Deployment Notes

1. Create a new GitHub repository.
2. Push this project to the repository.
3. Connect that repository to Vercel for the simplest production workflow.

Suggested commands:

```bash
git init
git add .
git commit -m "Build portfolio website"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

## Static Export Notes

This project is optimized for Vercel first because Firebase Auth popups and dynamic Firestore content are a better fit for a hosted Next.js app.

If you want a static-first build:

1. Set `NEXT_OUTPUT=export`
2. Build the project
3. Deploy the `out/` folder to a static host

Tradeoffs:

- Admin and live Firestore features are limited in static-only hosting scenarios
- Vercel remains the recommended deployment path

## Project Structure

```text
src/
  app/
  components/
  content/blog/
  data/
  hooks/
  lib/
  providers/
  types/
public/
firestore.rules
.env.example
```
