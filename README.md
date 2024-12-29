# Fullstack social-media app

## Description

This is a full-stack social media application comprising a Frontend and Backend, designed for user interaction, content creation, and real-time updates. The backend is built using NestJS, TypeScript, and PostgreSQL, while the frontend is powered by React. The application is containerized using Docker for seamless development and deployment.

---

## Prerequisites

Docker and Docker Compose - [https://www.docker.com/]
Node.js (if running without Docker)
PostgreSQL (if running without Docker)

---

## Project start

- Command to run the project in development mode:

```
docker-compose -f docker-compose.dev.yml up -d
```

- Command to run the project in production mode:

```
docker-compose -f docker-compose.prod.yml up -d
```

- Command to stop the project in development mode

```
docker-compose -f docker-compose.dev.yml down
```

- Command to stop the project in production mode

```
docker-compose -f docker-compose.prod.yml down
```

---

## Scripts

- see logs for frontend:
  `docker-compose -f docker-compose.dev.yml logs frontend`
- see logs for backend:
  `docker-compose -f docker-compose.dev.yml logs backend`

---

## Structure

- [Frontend](/social-media-frontend)
- [Backend](/social-media-backend)
