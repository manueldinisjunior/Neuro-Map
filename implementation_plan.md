# Neuro-Map Implementation Plan

## 1. Project Overview

Neuro-Map is a mind-mapping and notes application featuring 3D visualizations and an intelligent onboarding process.

## 2. Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Framer Motion, React Force Graph.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL with Prisma ORM.
- **i18n**: react-i18next for multi-language support (EN, DE, PT, ES).

## 3. Database Schema (Prisma)

- **User**: Authentication and profile data.
- **Topic**: Hierarchical categories for notes.
- **Note**: Individual markdown notes with word count tracking.
- **OnboardingState**: Track user progress through the multi-step wizard.

## 4. Backend Development (apps/api)

- [x] Initialize Express server with TypeScript and Modular Architecture.
- [x] Set up Prisma client and singleton.
- [ ] **Authentication**: Implement JWT-based login/register.
- [x] **Onboarding API**:
  - [x] `POST /onboarding/state`: Track user progress.
  - [x] `POST /onboarding/complete`: Generate initial topics and mark session as done.
- [x] **Topics & Notes CRUD**:
  - [x] `GET /topics`: Fetch user's nodes with scores.
  - [x] `POST /notes`: Create new notes with auto-topic association.
  - [x] `GET /notes`: Fetch recent notes for activity feed.
- [ ] **Stats API**: Provide data for global thinking patterns.

## 5. Frontend Development (apps/web)

- [x] **Core Layouts**:
  - [x] Public Layout (Landing pages, sign-in access).
  - [x] Dashboard Layout (Dark sidebar, search bar, activity feed).
- [x] **Authentication**:
  - [x] Premium Login Page (Visual split layout).
- [ ] **Onboarding Wizard**:
  - Step 1: Professional Background.
  - Step 2: Learning Goals.
  - Step 3: Interest Selection.
  - Step 4: Topic Generation (Animation phase).
- [ ] **Dashboard Enhancements**:
  - [x] Grid View for Notes.
  - [x] 3D Mind Map View.
  - [ ] Hierarchy Tree Sidebar Integration.
- [ ] **Note Editor**: Rich text or markdown editor component.

## 6. Verification & Quality Assurance

- [ ] Internationalization (verify all labels in all 4 languages).
- [ ] Accessibility (ARIA labels for icons and interactive elements).
- [ ] Responsive Design (ensure dashboard works on tablets/mobile).
