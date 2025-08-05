import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router, Request, Response, NextFunction } from "express";
import authRoutes from "./features/auth/auth.route";
import { getAuth } from "@clerk/express";

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

const routes = Router();

routes.get("/health", withAuth, async (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running smoothly!" });
});

routes.use("/api", authRoutes);

routes.get(
  "/api/chat",

  async (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "OK", message: "API is running protected!" });
  }
);

export default routes;
