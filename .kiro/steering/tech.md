# Technology Stack

## Build System & Package Management

- **Turborepo**: High-performance build system with intelligent caching
- **pnpm**: Fast, disk space efficient package manager (v9.0.0+)
- **Node.js**: >= 18 required
- **TypeScript**: v5.8.3 for type safety across all packages

## Web Stack (Next.js)

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **Tailwind CSS v4**: Utility-first CSS framework with JIT compilation
- **shadcn/ui**: Re-usable components built with Radix UI
- **Turbopack**: Fast bundler for development

## Mobile Stack (Expo)

- **Expo 53**: React Native development platform
- **React Native 0.79.5**: Cross-platform mobile framework
- **Expo Router**: File-based routing for React Native
- **NativeWind v4**: Tailwind CSS for React Native
- **Gluestack UI**: Universal UI component library

## Authentication & Database

- **Better Auth**: Secure authentication with Expo plugin
- **PostgreSQL**: Database with pg driver
- **Cross-platform sessions**: Shared auth state between web and mobile

## Development Tools

- **ESLint**: Code linting with shared configurations
- **Prettier**: Code formatting
- **TypeScript**: Type checking across all packages

## Common Commands

### Development
```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm dev --filter=web      # Web only
pnpm dev --filter=mobile   # Mobile only

# Platform-specific mobile development
pnpm dev --filter=mobile -- --ios
pnpm dev --filter=mobile -- --android
pnpm dev --filter=mobile -- --web
```

### Building
```bash
# Build all applications and packages
pnpm build

# Build specific applications
pnpm build --filter=web
pnpm build --filter=mobile
```

### Code Quality
```bash
# Run linting across all packages
pnpm lint

# Format code with Prettier
pnpm format

# Type checking
pnpm check-types
```

### Package Management
```bash
# Add dependency to specific app
pnpm add <package> --filter=web
pnpm add <package> --filter=mobile

# Add dev dependency
pnpm add -D <package> --filter=web

# Add UI components (shadcn/ui)
cd packages/ui && pnpm ui:add <component-name>

# Add UI components (Gluestack UI for mobile)
cd apps/mobile && pnpm ui:add <component-name>
```

### Database & Auth
```bash
# Generate Better Auth migration
pnpm --filter=web db:generate
```

## Environment Variables

Global environment variables (defined in turbo.json):
- `NODE_ENV`
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

App-specific environment files:
- `apps/web/.env.local` - Web app environment variables
- `apps/mobile/.env.local` - Mobile app environment variables