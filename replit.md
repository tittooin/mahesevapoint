# Overview

This is a full-stack web application built with Express.js, React, and PostgreSQL. The application is a Maharashtra E-Seva Kendra rent agreement calculator that helps users calculate total costs for rent agreements including government charges and service fees. Successfully migrated from Lovable to Replit environment with proper routing and security practices.

## Recent Changes (January 2025)
- ✅ Successfully migrated from Lovable to Replit environment
- ✅ Converted routing from react-router-dom to wouter for Replit compatibility
- ✅ Fixed calculator input reset issues (monthly rent and deposit now persist)
- ✅ Added authentic Maharashtra E-Seva branding with government service logos
- ✅ Integrated Tiro Devanagari Marathi font for proper Hindi text display
- ✅ Replaced all placeholder images with authentic Maharashtra E-Seva imagery
- ✅ Added comprehensive services section showcasing available digital services
- ✅ Implemented interactive service popups with detailed document requirements for all 25+ services
- ✅ Added contact forms within each service popup for service requests
- ✅ Replicated exact mahaesevapoint.in structure with complete document lists and service categories
- ✅ Application is fully functional and ready for production deployment

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for HTTP server and API routes
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: In-memory storage with interface for database migration
- **Development**: tsx for TypeScript execution in development

## Database Strategy
- **Database**: PostgreSQL (configured via Drizzle config)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Located in `./migrations` directory
- **Connection**: Neon serverless PostgreSQL driver

# Key Components

## Frontend Components
- **UI Components**: Complete shadcn/ui component library including forms, dialogs, tables, charts
- **Pages**: Index page with rent calculation functionality, 404 error page
- **Hooks**: Custom hooks for mobile detection and toast notifications
- **Routing**: Simple routing setup with catch-all 404 handling

## Backend Components
- **Server**: Express server with middleware for logging and error handling
- **Routes**: Modular route registration system (currently minimal setup)
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **User Management**: Basic user CRUD operations defined in storage interface

## Database Schema
- **Users Table**: Basic user entity with id, username, and password fields
- **Validation**: Zod schemas for type-safe data validation
- **Type Safety**: Full TypeScript integration with inferred types

# Data Flow

## Request Flow
1. Client makes HTTP requests to Express server
2. Server processes requests through registered routes
3. Routes interact with storage interface for data operations
4. Storage layer handles database operations via Drizzle ORM
5. Responses are sent back to client with appropriate error handling

## Frontend Data Management
1. React components use TanStack Query for server state
2. UI state managed through React hooks and context
3. Form validation handled through react-hook-form with Zod resolvers
4. Toast notifications for user feedback

# External Dependencies

## Core Dependencies
- **Database**: Neon serverless PostgreSQL
- **UI Library**: Radix UI primitives for accessible components
- **Validation**: Zod for schema validation and type safety
- **HTTP Client**: Built-in fetch (no additional HTTP client configured)
- **Development Tools**: Replit-specific plugins for development environment

## Build and Development
- **TypeScript**: Full TypeScript support across frontend and backend
- **ESBuild**: Used for production backend bundling
- **PostCSS**: For CSS processing and Tailwind CSS
- **Path Aliases**: Configured for clean imports (@, @shared, @assets)

# Deployment Strategy

## Build Process
- Frontend builds to `dist/public` directory using Vite
- Backend builds to `dist` directory using ESBuild
- Separate TypeScript compilation for type checking

## Environment Configuration
- Development: Uses tsx for TypeScript execution
- Production: Compiled JavaScript execution
- Database URL required via environment variable
- Replit-specific development features included

## Key Architecture Decisions

### Storage Abstraction
- **Problem**: Need for flexible data storage that can migrate from in-memory to database
- **Solution**: Interface-based storage layer with current in-memory implementation
- **Rationale**: Allows easy migration to PostgreSQL later while maintaining clean separation of concerns

### Full-Stack TypeScript
- **Problem**: Type safety across client and server boundaries
- **Solution**: Shared schema definitions and TypeScript throughout
- **Benefits**: Reduced runtime errors, better developer experience, shared type definitions

### Component Library Choice
- **Problem**: Need for accessible, customizable UI components
- **Solution**: shadcn/ui with Radix UI primitives
- **Benefits**: Accessibility built-in, highly customizable, modern design system

### Database Strategy
- **Problem**: Need for type-safe database operations
- **Solution**: Drizzle ORM with PostgreSQL
- **Benefits**: Type safety, good TypeScript integration, lightweight compared to alternatives