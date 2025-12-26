# Neuro Notes 🧠

Ein Full-Stack MVP zum Erstellen von Notizen und einer visuellen **Neuro Map**. Jede Topic wird als "Neuroparticle" dargestellt; die Größe wächst mit der Aktivität deiner Notizen.

## Architektur
```
neuro-notes/
  apps/
    api/   # Express + TypeScript + Prisma
    web/   # React + Vite + React Query
  infra/
    docker-compose.yml  # PostgreSQL
  packages/
    shared/             # Platzhalter für geteilten Code
  .env                  # globale ENV (DB, PORT)
  package.json          # Workspaces (API & Web)
```

## Quickstart (Windows / VS Code)
1) **Datenbank starten**
   ```bash
   docker compose -f infra/docker-compose.yml up -d
   ```

2) **API starten**
   ```bash
   cd apps/api
   npm install
   npx prisma migrate dev --name init
   npm run dev
   ```

3) **Frontend starten**
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```

- API: http://localhost:4000
- Frontend (Vite): Port 5173 (Standard)

## Features
- Notizen mit `topicName`, optional `title`, Pflichtfeld `content`
- Automatisches Topic-Upsert für den Demo-User `demo@local.dev`
- Zod-Validierung im API
- Prisma ORM mit PostgreSQL (Docker)
- Endpunkte: `/health`, `/topics`, `/notes` (POST + optional GET), `/map`
- Neuro Map Nodes: `score = notesCount + floor(wordsSum/50)`, `radius = clamp(12,60,12+score*2)`

## Test-Checkliste
- `GET /health` -> `{ ok: true }`
- `POST /notes` mit Topic + Content erzeugt Note und Topic
- `GET /map` liefert Nodes pro Topic mit Score & Radius
