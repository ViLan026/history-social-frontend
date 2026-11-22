# History Social — Frontend

## Project Overview

History Social is a social networking platform designed for people who are interested in history and historical research. Users can share historical knowledge through posts, interact with other users' content, follow people with similar interests, and explore historical events.

This repository contains the frontend application built with Next.js. It provides the user interface and communicates with the backend through REST APIs.

The project aims to:

- Create an interactive platform for sharing historical knowledge.
- Provide a user-friendly interface for creating and managing posts.
- Support social interactions between users.
- Allow users to discover and explore historical content.
- Build a modular and maintainable frontend architecture that can be extended over time.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Server State Management:** TanStack React Query
- **Client State Management:** Zustand

## Frontend Architecture

The project follows a **Feature-Based Architecture**. The application is organized into separate feature modules based on business domains, while shared components and application infrastructure are maintained independently.

This structure helps keep feature-related logic organized and makes the codebase easier to develop, maintain, and extend.

```text
src/
├── app
│   ├── (admin)
│   ├── (auth)
│   └── (main)
├── components
├── constants
├── features
│   ├── auth
│   ├── bookmark
│   ├── comment
│   ├── dashboard
│   ├── follow
│   ├── notification
│   ├── onthisday
│   ├── post
│   ├── reaction
│   ├── report
│   ├── role
│   └── user
├── lib
├── providers
├── styles
├── types
└── proxy.ts
```

### Core

The `src` directory contains shared application infrastructure and cross-cutting concerns:

- **app:** Defines application routes and page layouts using the Next.js App Router.
- **components:** Contains reusable UI and layout components shared across features.
- **constants:** Stores shared application constants.
- **lib:** Provides shared utilities and application-level configurations.
- **providers:** Contains application-level providers.
- **styles:** Contains global and shared styles.
- **types:** Defines shared TypeScript types.
- **proxy.ts:** Handles request and route-related logic.

### Module Structure

Each feature module is organized around a specific business domain. A feature may contain its own components, API services, state management, types, and custom hooks.

The main feature modules include:

- **auth:** Handles user authentication.
- **post:** Manages post-related functionality.
- **comment:** Handles comments and discussions.
- **bookmark:** Manages saved posts.
- **follow:** Handles user-following functionality.
- **reaction:** Manages reactions to content.
- **notification:** Handles user notifications.
- **onthisday:** Provides historical events associated with the current date.
- **user:** Manages user profiles and user-related functionality.
- **report:** Handles content reporting.
- **dashboard:** Provides dashboard-related functionality.
- **role:** Manages role-related functionality.

## Related Repositories

- **Backend:** [https://github.com/ViLan026/history_social_backend](https://github.com/ViLan026/history_social_backend)
