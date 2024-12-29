### Social Media Backend

## Description

This project is a backend system for a social media platform, designed using NestJS, TypeScript, and PostgreSQL. It provides APIs for user authentication, profile management, article creation, comments, notifications, and more. The backend also supports advanced features like role-based access control, real-time updates using WebSocket, and structured project organization.

## Project Start

```
npm install - install dependencies
npm run start - frontend project in dev mode
```

---

## Scripts

- `typeorm` - Runs TypeORM CLI commands for managing database schemas and migrations. Example commands include generating running, or reverting migrations.
- `migration:generate` - Generates a new migration file based on the changes detected in your TypeORM entities.
- `migration:run` - Executes all pending migrations, applying them to the database.
- `migration:revert` - Reverts the most recent migration, rolling back its changes.
- `start:prod` - Builds the project for production and starts the server using the compiled JavaScript code.
- `build` - Compiles the NestJS application into JavaScript files in the `dist` directory.
- `format` - Formats your codebase using Prettier to ensure consistent code style.
- `start` - Starts the application using Node.js, typically with the compiled production files (`dist/main.js`).
- `start:dev` - Starts the application in development mode with hot-reloading using tools like `ts-node` or `nodemon`.
- `start:debug` - Starts the application in debug mode, enabling breakpoints and debugging tools.
- `lint` - Lints the codebase using ESLint to identify and fix issues with code quality and style.
- `test` - Runs all unit tests using the Jest testing framework.
- `test:watch` - Runs unit tests in watch mode, re-running tests when files are changed.
- `test:cov` - Runs all tests and generates a code coverage report.
- `test:debug` - Runs tests in debug mode, allowing you to attach a debugger to troubleshoot failing tests.
- `test:e2e` - Runs end-to-end tests to verify the entire application’s functionality using tools like Jest or Supertest.
- `lint:perfectionist` - Runs ESLint with the `perfectionist` plugin to enforce strict rules for decorator and import ordering.

---

## Project Architecture

The backend is designed following a modular structure inspired by Domain-Driven Design (DDD) principles. Each module represents a specific feature or domain, encapsulating its logic and maintaining a clear separation of concerns. This approach ensures scalability, maintainability, and ease of development.

---

## API Documentation

The API documentation is generated and hosted using Swagger, providing a user-friendly interface to explore and test the available endpoints.
Swagger UI - [http://localhost:5001/api-docs#/]

---

## Linting

The project uses eslint to check typescript code and perfectionist to sort decorators.

##### Running linters

- `npm run lint` - Check ts files with linter
- `npm run lint:perfectionist` - Sort decorators in ts files with linter
