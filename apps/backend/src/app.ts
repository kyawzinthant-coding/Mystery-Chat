import express, { application } from "express";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./lib/prisma";
import { errorHandler } from "./middleware/error-handler";
import routes from "./routes";
import { clerkMiddleware } from "@clerk/express";
import { ChatWebSocketServer } from "./service/websocket/websocket.server";
import { createServer } from "http";

const app = express();
app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.use(routes);

app.use(errorHandler);

export default app;
