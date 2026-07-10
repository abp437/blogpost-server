# BlogPost Server

A Node.js backend for the **BlogPost** application built with **Express**, **Apollo Server**, **GraphQL**, **MongoDB**, and **JWT authentication**.

## Features

* GraphQL API with Apollo Server
* User authentication using JWT
* Access and refresh tokens
* MongoDB with Mongoose
* Cookie-based authentication
* TypeScript support
* Docker support for easy setup

---

## Tech Stack

* Node.js
* Express
* Apollo Server
* GraphQL
* MongoDB
* Mongoose
* TypeScript
* Docker

---

# Recommended: Run with Docker

The recommended way to run this application is with Docker Compose. It starts the backend server and MongoDB together with the required configuration.

## Prerequisites

Install:

* Docker
* Docker Compose

---

## 1. Clone the repository

```bash
git clone <repository-url>
cd blogpost-server
```

---

## 2. Create the environment file

The repository includes a `.env.example` file containing the required environment variables.

Create your local `.env` file by copying it:

```bash
cp .env.example .env
```

Update the values in `.env` according to your environment.

> **Important:** When running with Docker Compose, the MongoDB connection string should use the Docker service name:
>
> ```env
> MONGO_URL=mongodb://mongodb:27017/blogpost
> ```
>
> Do not use `localhost` for MongoDB inside Docker containers.

---

## 3. Start the application

Build and start the containers:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

The GraphQL API will be available at:

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

Stop containers and remove database data:

```bash
docker compose down -v
```

> **Warning:** Removing volumes deletes the MongoDB data stored by Docker.

---

# Local Development (Optional)

Docker is the recommended setup, but you can also run the server directly.

## Prerequisites

* Node.js
* npm
* MongoDB

---

## Install dependencies

```bash
npm install
```

---

## Configure environment variables

Create your environment file from the example:

```bash
cp .env.example .env
```

For local development, update your MongoDB URL:

```env
MONGO_URL=mongodb://localhost:27017/blogpost
```

---

## Run the development server

```bash
npm run dev
```

---

## Build and run production version

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

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Compile TypeScript                       |
| `npm start`     | Start compiled production server         |
| `npm run clean` | Remove compiled files                    |

---

# Project Structure

```text
.
├── src/
│   ├── config/
│   ├── graphql/
│   ├── middleware/
│   ├── models/
│   ├── resolvers/
│   ├── schema/
│   ├── utils/
│   └── index.ts
├── dist/
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

---

# Authentication

The API uses:

* JWT access tokens
* JWT refresh tokens
* HTTP cookies for authentication sessions

Protected GraphQL operations require a valid authenticated user.

---

# GraphQL Endpoint

```text
http://localhost:3000/graphql
```

---

# License

ISC

---

# Author

**Akshay Pawar**
