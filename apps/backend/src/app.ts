import express from "express";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./lib/prisma";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/health", async (req, res) => {
  const user = await prisma.user.findMany();
  return res.json(user);
});

export default app;
