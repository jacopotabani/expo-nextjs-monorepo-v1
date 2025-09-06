# Project Structure

## Monorepo Organization

This is a Turborepo monorepo with pnpm workspaces organized into three main directories:

```
├── apps/           # Applications
├── packages/       # Shared packages
└── tooling/        # Development tooling
```

## Applications (`apps/`)

### Web App (`apps/web/`)
Next.js 15 application with App Router:
- `app/` - App Router pages and API routes
- `app/api/auth/` - Better Auth API routes
- `lib/` - Web-specific utilities and configurations
- Uses shadcn/ui components and Tailwind CSS v4

### Mobile App (`apps/mobile/`)
Expo 53 React Native application:
- `app/` - File-based routing with Expo Router
- `app/api/auth/` - API routes for web compatibility
- `lib/auth/` - Better Auth client configuration
- `components/ui/` - Mobile-specific UI components using Gluestack UI
- Uses NativeWind v4 for styling

## Shared Packages (`packages/`)

### Auth Package (`packages/auth/`)
Centralized authentication logic:
- `better-auth.ts` - Server-side auth configuration
- `better-auth-client.ts` - Client-side auth utilities
- Exports auth functions for both web and mobile

### UI Package (`packages/ui/`)
Shared component library:
- `src/components/` - Reusable UI components (shadcn/ui based)
- `src/lib/` - Utilities and global styles
- `components.json` - shadcn/ui configuration
- Exports components that work across platforms

### Database Package (`packages/db/`)
Database schema and migrations:
- `src/migration.sql` - Better Auth generated migrations

## Development Tooling (`tooling/`)

### ESLint Config (`tooling/eslint/`)
Shared linting configurations:
- `base.js` - Base ESLint rules
- `next.js` - Next.js specific rules
- `react-internal.js` - React component library rules

### Tailwind Config (`tooling/tailwind/`)
Shared Tailwind CSS configurations:
- `postcss.config.mjs` - PostCSS configuration

### TypeScript Config (`tooling/typescript/`)
Shared TypeScript configurations:
- `base.json` - Base TypeScript config
- `nextjs.json` - Next.js specific config
- `react-library.json` - React library config

## Workspace Dependencies

### Internal Package References
Use `workspace:*` for internal dependencies:
```json
{
  "dependencies": {
    "@acme/ui": "workspace:*",
    "@acme/auth": "workspace:*",
    "@acme/tailwind": "workspace:*"
  }
}
```

### Package Naming Convention
- Scoped packages use `@acme/` prefix
- Apps use simple names: `web`, `mobile`
- Tooling packages use descriptive names: `eslint`, `tailwind`, `typescript`

## File Organization Patterns

### Component Structure
```
components/
├── ui/                 # UI components
│   ├── button/
│   │   ├── index.tsx   # Main component
│   │   └── styles.tsx  # Platform-specific styles
│   └── card/
└── feature/            # Feature-specific components
```

### API Routes
```
app/api/
├── auth/
│   └── [...all]/       # Better Auth catch-all route
└── other-endpoints/
```

### Library Structure
```
lib/
├── auth/               # Authentication utilities
├── utils/              # General utilities
└── config/             # Configuration files
```

## Configuration Files

### Root Level
- `package.json` - Root package with scripts and dev dependencies
- `turbo.json` - Turborepo configuration with tasks and caching
- `pnpm-workspace.yaml` - pnpm workspace configuration

### App Level
- Each app has its own `package.json`, `tsconfig.json`, and config files
- Environment variables in `.env.local` files
- Platform-specific configurations (e.g., `next.config.ts`, `app.json`)

## Import Conventions

### Internal Package Imports
```typescript
// Shared packages
import { Button } from '@acme/ui/components/button'
import { createAuthClient } from '@acme/auth/better-auth-client'

// Relative imports within same package
import { utils } from '../lib/utils'
import { Component } from './component'
```

### External Dependencies
- Keep external dependencies in appropriate packages
- Avoid duplicating dependencies across packages when possible
- Use peer dependencies for shared libraries like React