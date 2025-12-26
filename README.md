# Neuro Notes 🧠

Neuro Notes ist ein Full-Stack MVP zum Schreiben von Gedanken und Wissen.  
Inhalte werden automatisch in einer visuellen **Neuro-Map** dargestellt:  
Jedes Thema erscheint als **Neuroparticle**, dessen Größe vom Umfang und der Aktivität der Inhalte abhängt.

---

## Tech Stack

**Frontend**
- React + Vite
- TypeScript
- TanStack React Query

**Backend**
- Node.js + Express
- TypeScript
- Prisma ORM
- Zod Validation

**Database**
- PostgreSQL (Docker)

**Dev**
- Git & GitHub
- Docker Compose

---

## Features (MVP)

- Notes erstellen (Topic, Titel optional, Content)
- Topics werden automatisch angelegt
- Neuro-Map:
  - ein Node pro Topic
  - Größe basiert auf Content-Score
- REST API
- Demo-User (ohne Auth)

---

## Setup (Windows / macOS / Linux)

### 1. Datenbank starten
```bash
docker compose -f infra/docker-compose.yml up -d
