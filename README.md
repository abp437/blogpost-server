# BlogPost Server

A backend for the **BlogPost** application built with **Express**, **Apollo Server**, **GraphQL**, **MongoDB**, and **JWT authentication**.

The application provides a hybrid API architecture with both **REST** and **GraphQL** endpoints running on the same Express server.

---

# Architecture Overview

This application contains both a **REST API** and a **GraphQL API**.

## REST API

The REST API is responsible for:

* User registration
* User authentication
* JWT authentication flows
* Refresh token handling

Authentication-related routes are implemented using REST controllers.

---

## GraphQL API

The GraphQL API is mounted directly on Express using Apollo Server.

GraphQL is available at:

```text
/graphql
```

All blog post operations are handled through GraphQL, including:

* Create posts
* Read posts
* Update posts
* Delete posts

---

## Authentication & Authorization

* Private routes are protected using JWT authentication.
* Access tokens are used for authenticated requests.
* Refresh tokens are managed using HTTP-only cookies.
* Protected GraphQL operations require a valid authenticated user.

---

# Project Structure

The application follows a modular structure:

```text
src/
├── controllers/
│   └── REST API controllers
│
├── graphql/
│   ├── queries/
│   └── mutations/
│
├── services/
│   └── Shared business logic
│
├── models/
├── middleware/
├── config/
└── index.ts
```

---

# Application Layers

## Controllers

Controllers handle REST API requests and responses.

Responsibilities:

* Request validation
* Calling services
* Sending HTTP responses

---

## Queries & Mutations

GraphQL operations are separated into:

* Queries
* Mutations

Responsibilities:

* Handling GraphQL requests
* Calling shared services
* Returning GraphQL responses

---

## Services

Services contain the core business logic.

They are shared between:

* REST controllers
* GraphQL resolvers

This avoids duplicating application logic between the two API layers.

---

## Repository Pattern

The repository pattern is intentionally not implemented in this project.

The application has a relatively small scope, and introducing an additional abstraction layer would add unnecessary complexity.

The current structure keeps the codebase simple while maintaining separation between:

* API handling
* Business logic
* Database operations

---

# Features

* User registration and authentication
* JWT-based authentication
* Refresh token support
* CRUD operations for blog posts
* GraphQL API using Apollo Server
* REST authentication API
* MongoDB persistence using Mongoose
* TypeScript support
* Docker support

---

# Recommended: Run with Docker in Production Mode

Docker Compose is the recommended way to run this application.

It starts:

* Node.js server
* MongoDB database

with the required production configuration.

Using Docker ensures the application runs in a consistent environment.

---

## Prerequisites

Install:

* Docker
* Docker Compose

---

## 1. Create environment file

The repository contains a `.env.example` file.

Create your production environment file:

```bash
cp .env.example .env
```

Update the values in `.env` as required.

When running with Docker, MongoDB should use the Docker service hostname:

```env
MONGO_URL=mongodb://mongodb:27017/blogpost
```

Do not use `localhost` for MongoDB when running inside Docker.

---

## 2. Build and start the application

Build the production image and start the containers:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

---

## 3. Verify the application

REST API:

```text
http://localhost:3000
```

GraphQL API:

```text
http://localhost:3000/graphql
```

---

# Docker Commands

View logs:

```bash
docker compose logs -f
```

View server logs only:

```bash
docker compose logs -f server
```

Stop containers:

```bash
docker compose down
```

Stop containers and remove database volume:

```bash
docker compose down -v
```

> Warning: Removing volumes permanently deletes MongoDB data.

---

# Local Development (Optional)

Docker production mode is the recommended approach, but the application can also be run locally for development.

---

## Install dependencies

```bash
npm install
```

---

## Configure environment

Create your environment file:

```bash
cp .env.example .env
```

For local MongoDB:

```env
MONGO_URL=mongodb://localhost:27017/blogpost
```

---

## Run development server

```bash
npm run dev
```

---

## Run production build locally

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

---

# Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Compile TypeScript       |
| `npm start`     | Run production build     |
| `npm run clean` | Remove build output      |

---

# License

ISC

---

# Author

**Akshay Pawar**
