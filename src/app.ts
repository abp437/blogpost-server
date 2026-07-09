import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic Route
app.get("/", (_, res) => res.status(200).json({ msg: "Hello, World!" }));

// Server & DB health Routes
app.use("/health", healthRoutes);

// REST authentication routes
app.use("/api/auth", authRoutes);

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await graphqlServer.start();

app.use(
  "/graphql",
  authMiddleware,
  expressMiddleware(graphqlServer, {
    context: async ({ req }) => ({
      user: req.user,
    }),
  }),
);

// Fallback for unmatched routes
app.use((_, res) => res.status(404).json({ error: "Not Found" }));

export default app;
