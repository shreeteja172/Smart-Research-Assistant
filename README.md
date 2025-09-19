# 🚀 Smart Research Assistant  

## 📸 Screenshots

<p align="center">
  <img src="./public/screenshots/Landing1.png" alt="Landing Page" width="800"/>
</p>

<p align="center">
  <img src="./public/screenshots/dashboard.png" alt="Dashboard" width="800"/>
</p>

<p align="center">
  <img src="./public/screenshots/chat.png" alt="Chat" width="800"/>
</p>

<p align="center">
  <img src="./public/screenshots/feats.png" alt="Features" width="800"/>
</p>

<p align="center">
  <img src="./public/screenshots/notes.png" alt="Notes" width="800"/>
</p>

<p align="center">
  <img src="./public/screenshots/signup.png" alt="Signup" width="800"/>
</p>



<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61dafb" /></a>
  <a href="https://prisma.io"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748" /></a>
  <a href="https://upstash.com/vector"><img src="https://img.shields.io/badge/Upstash-Vector-00E9A3" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-38B2AC" /></a>
  <a href="https://sdk.vercel.ai"><img src="https://img.shields.io/badge/AI%20SDK-OpenAI-000000" /></a>
</p>

---

An **AI-first Next.js app** that lets users authenticate, upload PDFs, and chat with an assistant that references their own content.  
Built with **React 19, Next.js 15, Turbopack, Tailwind v4, Better Auth, Prisma, Upstash Vector, and AI SDK**.  

---

## ✨ Highlights
- ⚡ Modern App Router (Next.js 15) + React 19 + Turbopack  
- 🔐 Auth: Better Auth (Email/Password + Google OAuth)  
- 📚 Vector search via Upstash Vector (per-user namespaces)  
- 🤖 AI chat with streaming responses (`ai`, `@ai-sdk/openai`)  
- 📂 PDF/DOC/DOCX ingestion with LangChain loaders + chunking  
- 🎨 Polished UI: Tailwind v4 + Radix UI + Lucide  

---

## 🛠 Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript  
- **Styling:** Tailwind v4, Radix UI, Lucide Icons  
- **Auth:** Better Auth + Prisma ORM (PostgreSQL)  
- **Database:** Prisma + PostgreSQL  
- **AI/Vector:** AI SDK, LangChain, Upstash Vector  
- **State:** TanStack Query 5  

---

## 📂 Project Structure
```bash
src/
  app/                         # App Router pages & API routes
    api/
      auth/[...all]/route.ts   # Better Auth handler
      chat/route.ts            # Chat with RAG context
      document/route.ts        # Document ingestion
  components/                  # UI (chat, auth, dashboard)
  lib/                         # Auth, Vector, Prisma client configs
  actions/                     # Server actions
prisma/
  schema.prisma                # Data models


pnpm install   # install dependencies
npx prisma generate
npx prisma migrate dev --name init
pnpm dev       # start dev server
