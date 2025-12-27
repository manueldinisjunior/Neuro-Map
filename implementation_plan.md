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
- [ ] Initialize Express server with TypeScript.
- [ ] Set up Prisma client and connection.
- [ ] **Authentication**: Implement JWT-based login/register.
- [ ] **Onboarding API**:
    - `POST /onboarding/start`: Initiate user data collection.
    - `POST /onboarding/generate-topics`: AI/Mock generation of topics based on user input.
- [ ] **Topics & Notes CRUD**:
    - `GET /topics`: Fetch user's hierarchical tree.
    - `POST /notes`: Create new notes.
    - `GET /notes/:id`: Fetch note content.
- [ ] **Stats API**: Provide data for the dashboard activity feed.

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
