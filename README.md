# Portfolio // Taha Hakim Khan

High-contrast Neo-Brutalist developer portfolio engineered with Next.js (App Router), Tailwind CSS, TypeScript, MongoDB Atlas, and automated multi-channel lead dispatch.

---

## ⚡ Tech Stack & Architecture

- **Frontend & Rendering:** Next.js 16 (React 19, TypeScript, App Router, Server Components)
- **Styling & System Design:** Tailwind CSS (Custom Neo-Brutalist & Tactile Scrapbook tokens)
- **Database & ODM:** MongoDB Atlas with Mongoose (connection-pooled serverless handlers)
- **Security & Studio Access:** Stateless HTTP-only JWT cookies (`jose`), salted client/server SHA-256 / bcrypt hashing
- **Multi-Channel Dispatch:** Parallel broadcaster routing contact form leads directly to Telegram, Gmail (Resend), and WhatsApp (Twilio)
- **CI/CD Quality Gate:** GitHub Actions (TypeScript check, ESLint verification, build check)

---

## 📁 Repository Anatomy

- `.github/workflows/ci.yml` — CI validation pipeline
- `src/app/(public)/` — Public landing page (Hero, About, Vault, Journey)
- `src/app/api/` — Serverless route handlers (Inquiries, Projects, Auth)
- `src/app/studio/` — Hidden Admin Management Studio
- `src/components/sections/` — Page sections (Hero, About, Experience, Vault, etc.)
- `src/components/studio/` — Admin CMS modals and project mutators
- `src/components/ui/` — Base Neo-Brutalist primitives
- `src/lib/db/` — MongoDB connection pool & Mongoose models
- `src/lib/dispatch.ts` — Parallel Telegram/Gmail/WhatsApp broadcaster
- `src/lib/auth.ts` — JWT and passphrase utilities
- `src/scripts/` — CLI seed scripts (`seed-admin.ts`)
- `src/middleware.ts` — Route protection for `/studio` and mutation APIs
- `.cursorrules` — AI Agent guidance and system rules
- `AGENTS.md` — Token-optimized AI Agent directives

---

## 🚀 Quickstart (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd portfolio
npm install