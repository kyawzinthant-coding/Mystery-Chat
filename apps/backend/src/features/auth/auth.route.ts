import { Router } from "express";
import { handleClerkWebHook } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/webhooks/clerk", handleClerkWebHook);

export default authRoutes;
