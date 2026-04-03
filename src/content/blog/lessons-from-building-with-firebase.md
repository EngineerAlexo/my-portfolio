---
title: "Lessons From Building With Firebase"
description: "A few practical takeaways from using Google Auth and Firestore in portfolio and dashboard projects."
publishedAt: "2026-01-25"
tags:
  - Firebase
  - Firestore
  - Auth
---

Firebase is useful when I want to move quickly without building a full custom backend first.

## What I learned

- Authentication gets much easier with Google sign-in.
- Firestore works well for lightweight dashboards and content management.
- Security rules matter just as much as frontend checks.
- Placeholder-safe environment handling is important during development.

I still try to keep the UI independent from Firebase details so the app can degrade gracefully or swap data sources later if needed.
