# Articlarity Learn 🦉

> **Complete Master Software Requirements Specification (SRS) v7.0 (Final Gold Master)**  
> **Domain**: [learn.articlarity.com](https://learn.articlarity.com) · **Parent Brand**: [articlarity.com](https://articlarity.com)  
> **Author & Owner**: @Harshith · **Date**: October 31, 2026  
> **Infrastructure**: 100% Cloudflare Native Edge Stack (Pages + Workers + D1 + KV + R2 + Queues + Cron Triggers + Turnstile)

---

## 🌟 Executive Summary & Product Philosophy

**Articlarity Learn** is a gamified, motion-first technical learning platform that combines:
1. **Duolingo-Style Micro-Learning**: Bite-sized steps (`INTUITION` → `DRY_RUN` → `SPOT_BUG` → `PARSONS` → `FILL_BLANK` → `FULL_CODE`) with witty mascot companions.
2. **LeetCode Python DSA Mastery**: Curated 11-unit curriculum with pattern mapping and 1-click solution export.
3. **Exam-Faithful GATE CS 2027 Preparation**: Aligned with the official IIT Madras brochure, featuring 18 interactive pattern visualizers, verified 2021–2026 PYQ answer keys, and a faithful clone of the TCS iON Virtual Scientific Calculator.

---

## 🏗️ 100% Cloudflare Native Architecture

| Layer | Cloudflare Product | Binding Name | Exact Responsibility |
|---|---|---|---|
| **Frontend & Edge SSR** | Cloudflare Pages (Next.js App Router) | — | Serves static & edge-rendered pages, PWA assets across 300+ PoPs in $< 10\text{ ms}$. |
| **Serverless API & Auth** | Cloudflare Workers | — | Executes edge API routes (`/api/auth/*`, `/api/streak/*`, `/api/github/*`, `/api/admin/*`). |
| **Relational SQL Database**| Cloudflare D1 (Distributed SQLite) | `DB` | Primary relational store for users, streaks, badges, curriculum, and audit logs. |
| **Ultra-Fast Edge Cache** | Cloudflare Workers KV | `CONFIG_KV` | Stores site tokens, 3D button lip depth, precomputed 365-day heatmaps, and sessions. |
| **Object & Asset Storage** | Cloudflare R2 | `ASSETS_R2` | Zero-egress storage for diagrams, avatars, social cards, and nightly D1 `.sql` backups. |
| **Async Background Jobs** | Cloudflare Queues | `GITHUB_QUEUE`| Asynchronously commits solved solutions and regenerates user `README.md` tables. |
| **Scheduled Tasks** | Cloudflare Cron Triggers | `0 * * * *` | Hourly cron to evaluate timezone streaks, freeze consumption, and birthday 2x XP boosts. |
| **Bot & Security Shield** | Cloudflare Turnstile + WAF | — | Protects `/register`, `/login`, and `/admin` against credential stuffing and scraping. |

---

## 🔐 3-Tier Access & Identity Architecture

1. **Tier 1 — Anonymous / Instant Guest Mode (Zero Login Wall)**:
   - **Standalone Compiler** (`/compiler`): Anyone can run Python 3.12 and ANSI-C code immediately with zero signup, zero popups, and zero server lag.
   - **Public Curriculum**: Free access to all 11 DSA units, topics, concept guides, and outbound LeetCode links (`rel="noopener noreferrer"`).
   - **Local Persistence**: Client-side storage via IndexedDB / localStorage.

2. **Tier 2 — Registered Learner Profile** (`/register` & `/u/[username]`):
   - **Registration**: Full Name, Unique Username, Email (OTP verified), Phone (E.164), Date of Birth (`dob`), and Place/College (e.g., `Jagtial · SR University`).
   - **365-Day SVG Heatmap**: 5 intensity levels (`#161b22` → `#0e4429` → `#006d32` → `#26a641` → `#39d353`), plus **Gold Sparkle** on boss fight days and **Ice Blue** (`#38bdf8`) on streak freeze days.
   - **7 Streak Reward Tiers**: 3 Days (Spark Starter) to 365 Days (Articlarity Immortal).
   - **20 Master Badges**: 3D Trophy Cabinet with category filtering and XP awards.
   - **GitHub Auto-Commit Integration**: Automatically commits solved `.py` and `.c` code and updates the root `README.md` contribution graph.

3. **Tier 3 — Stealth System Administrator** (`/admin`):
   - **Zero Public Footprint**: No link or mention anywhere in the public UI, navbar, footer, or sitemap.
   - **Security**: Direct navigation to `/admin` renders WebAuthn Passkey + TOTP 2FA authentication backed by D1 audit logs.

---

## 🦉 Mascot Companion ("Arti") & Dialogue System

Arti is an expressive companion supporting 3 vibe modes selectable directly from the navbar:
- **🦉 Savage / Playful (Default)**: Witty coding roasts when using brute-force $O(N^2)$ approaches or skipping colons.
- **🔥 Flirty (1-Tap Opt-In for 18+)**: Smooth logic and charming lines when writing optimal algorithms or pushing code.
- **🌱 Gentle Mode**: Supportive hints and encouraging words.
- **Anti-Spam & Frustration Guard**: 25-item memory window prevents dialogue repetition. If a user encounters 3 consecutive failed runs or 2 timeouts, roasts pause automatically and switch to gentle hints.

---

## 🎓 GATE CS 2027 Module (`/gate`)

- **Official Exam Alignment**: Indian Institute of Technology Madras (Feb 6, 7, 13, 14, 20, 21, 2027).
- **CBT Mock Engine** (`/gate/mock`): 65 Questions, 100 Marks, 180 Minutes (240 Minutes PwD mode toggle).
- **Virtual Scientific Calculator**: Authentic clone of the TCS iON calculator used in the official exam.
- **18 Interactive Pattern Simulators**:
  - IEEE-754 32-bit Floating Point Bit-Flipper (Hex ↔ Float)
  - 4-Variable Gray-Code K-Map Prime Implicant Solver
  - Cache Tag / Index / Offset & Loop Thrashing Simulator
  - 5-Stage CPU Pipeline Hazard Reservation Table
  - Preemptive Multi-CPU Gantt Chart Scheduler
  - Minimal DFA State Partitioner & Master Theorem Solver
- **Official PYQ Vault (2021–2026)**: Verified answer keys, 30-second shortcut derivation cards, and complete step-by-step solutions.

---

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start local Next.js development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Production Build & Edge Verification
```bash
# Build optimized static and serverless edge output
npm run build
```

### Cloudflare Deployment (Wrangler)
```bash
# Step 1: Provision D1 Database
npx wrangler d1 create articlarity_learn_db

# Step 2: Run D1 Master Migration
npx wrangler d1 execute articlarity_learn_db --file=migrations/0001_master_schema.sql

# Step 3: Create KV Namespace, R2 Bucket, and Queue
npx wrangler kv namespace create CONFIG_KV
npx wrangler r2 bucket create articlarity-learn-assets
npx wrangler queues create articlarity-github-commits

# Step 4: Deploy to Cloudflare Pages
npx wrangler pages deploy .vercel/output/static
```

---

## 📄 License
© 2026 Articlarity. All rights reserved. Created and maintained by @Harshith.
