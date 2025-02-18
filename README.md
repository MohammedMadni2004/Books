# Backend Setup Guide

## Prerequisites

Before running the backend, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- PostgreSQL database
- Prisma CLI

## Environment Setup

1. Create a `.env` file in the backend directory.
2. Add the following environment variable:
   ```env
   DATABASE_URL="your_postgresql_connection_url"
   ```
   Replace `your_postgresql_connection_url` with your actual PostgreSQL connection string.

## Database Setup

1. **Run database migrations**
   ```sh
   pnpm prisma migrate dev --name init
   ```
2. **Generate Prisma Client**
   ```sh
   pnpm prisma generate
   ```
3. **Seed the database**
   ```sh
   pnpm run db:seed
   ```

## Running the Backend

To start the development server, use:

```sh
pnpm run dev
```

## Available Scripts

- `pnpm run dev` - Starts the development server with `tsx watch`.
- `pnpm run build` - Builds the project using TypeScript.
- `pnpm run db:push` - Pushes Prisma schema changes to the database.
- `pnpm run db:seed` - Seeds the database with initial data.

## Notes

- Ensure PostgreSQL is running before executing database commands.
- Update `.env` with correct database credentials to avoid connection issues.

