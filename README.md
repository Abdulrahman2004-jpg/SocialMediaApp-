# ConnectHub Backend

**Author:** Abdulrahman

RESTful API and real-time social platform backend built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Redis**.

## Project Structure

- `src/modules/` — Feature modules (`auth`, `users`, `posts`, `comments`, `reactions`, `friends`, `chat`, `stories`, `socket`, `graphql`)
- `src/database/` — Database connection and Mongoose models/repositories
- `src/shared/` — Shared middlewares, services, utilities, enums, and validations

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create the environment files required by `src/config/config.service.ts`, for example `.env.development` or `.env.production`.
   Firebase push notifications require a service-account JSON file. Set `FIREBASE_SERVICE_ACCOUNT_PATH` to its path; without it, notifications are disabled outside production. Keep credential files out of version control.

3. Run type checking and build:
   ```bash
   npm run typecheck
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```