# AGENT DIRECTIVES & ARCHITECTURE CONTRACTS

This repository is a Next.js 16 (App Router) developer portfolio built with TypeScript, Tailwind CSS, MongoDB Atlas, and a multi-channel lead dispatch system. Any automated agent modifying this repository must adhere to the invariants below.

---

## 1. TOKEN ECONOMY & OUTPUT DISCIPLINE (MANDATORY)

- **DIFFS & SNIPPETS ONLY**: Never output full 200+ line files when modifying an existing component or route. Output only the modified function, hook, or JSX block with 2 lines of surrounding code as an anchor.
- **NO CHATTER OR BOILERPLATE**: Eliminate introductions, greetings, and transitional summaries. Jump straight into the code or execution steps.
- **POWERSHELL SYNTAX FIRST**: The host system is Windows PowerShell. Never output trailing bash line-continuation backslashes (`\`). Use single-line terminal commands or PowerShell backtick continuation (``` ` ```).
- **CONCISE PR / COMMIT DESCRIPTIONS**: Limit explanations of changes to bulleted technical points.

---

## 2. STACK INVARIANTS & SYSTEM ARCHITECTURE

- **Framework**: Next.js 16 (App Router), React 19, TypeScript (`strict: true`).
- **Styling**: Tailwind CSS with custom Neo-Brutalist & Cyber-Noir tokens.
- **Database**: MongoDB Atlas using Mongoose via connection pooling (`@/lib/db/mongodb`).
  * Never initiate raw `mongoose.connect()` inside Route Handlers.
  * Always use `mongoose.models.ModelName || mongoose.model('ModelName', Schema)` to avoid Mongoose hot-reload model re-compilation panics.
- **Security & Studio Access**:
  * No public `/login` or `/signup` views or navigation anchors.
  * Protected routes (`/studio/*`) and mutating API endpoints (`POST`, `PUT`, `DELETE` on `/api/projects`) must be guarded by `src/middleware.ts` verifying the `portfolio_auth_token` HTTP-only JWT cookie.
- **Lead Dispatch**:
  * Contact inquiries submitted to `/api/inquiries` are persisted to MongoDB and broadcast in parallel via `Promise.allSettled` to Telegram, Resend (Gmail), and Twilio (WhatsApp).
  * Delivery failures in any external notification transport must be logged as warnings but must NEVER cause the API route to return a 500 error to the client.

---

## 3. DESIGN TOKENS (NEO-BRUTALIST + SCRAPBOOK)

- **Color Palette**:
  * Dark Base / Graphite: `#121316` (`bg-[#121316]`, `border-[#121316]`, `text-[#121316]`)
  * Light Background / White: `#F4F5F7` (`bg-[#F4F5F7]`, `text-[#F4F5F7]`)
  * Accent Punch / Sunshine Yellow: `#FFD13B` (`bg-[#FFD13B]`, `text-[#FFD13B]`, `border-[#FFD13B]`)
- **Borders & Shadows**:
  * Outer border: `border-2 border-[#121316]`
  * Offset Box-Shadow (Light Elements): `shadow-[4px_4px_0px_0px_#121316]`
  * Offset Box-Shadow (Dark/Accent Cards): `shadow-[4px_4px_0px_0px_#FFD13B]`
  * Interactive Hover: `hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform`
- **Typography Convention**:
  * Section Headers & Hero Display: Bold grotesque / sans display (`font-sans font-black tracking-tight`).
  * Architecture Metrics & Code Stats: Monospace (`font-mono`).

---

## 4. REPO CONVENTIONS & PATH CONTRACTS

```text
src/
├── app/
│   ├── (public)/page.tsx        # Public landing view (Hero, About, Vault, Journey)
│   ├── api/
│   │   ├── auth/session/route.ts # Issues JWT cookie upon master passphrase verification
│   │   ├── inquiries/route.ts   # Contact endpoint + dispatch trigger
│   │   └── projects/route.ts    # Public GET (cached) & Protected POST/PUT/DELETE
│   └── studio/page.tsx          # Hidden Admin Management Studio
├── components/
│   ├── sections/                # Hero, About, Experience, ProjectVault, Journey, Contact
│   └── studio/                  # Modals for project creation and bio mutation
├── lib/
│   ├── db/mongodb.ts            # Global Mongoose cached connection pool
│   ├── db/models/               # Project.ts, Inquiry.ts, Admin.ts
│   └── dispatch.ts              # Multi-channel notification relay
├── scripts/seed-admin.ts        # CLI admin initialization script
└── middleware.ts                # Route protection layer