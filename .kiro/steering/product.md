# Product Overview

This is a modern cross-platform monorepo skeleton for building web and mobile applications with shared authentication and UI components.

## Key Features

- **Cross-platform authentication** using Better Auth that works seamlessly across web (Next.js) and mobile (Expo)
- **Shared UI components** that work on both platforms using shadcn/ui for web and Gluestack UI for mobile
- **Type-safe development** with full TypeScript support across all packages
- **Modern styling** with Tailwind CSS v4 for web and NativeWind v4 for mobile
- **Production-ready architecture** optimized for scale and performance

## Target Platforms

- **Web**: Next.js 15 with App Router
- **Mobile**: Expo 53 with React Native
- **Shared**: Reusable packages for auth, UI, and tooling

## Authentication Flow

The project uses Better Auth for secure, production-ready authentication:
- Web app handles auth via Next.js API routes
- Mobile app connects to the web backend for authentication
- Supports email/password authentication with extensible plugin system