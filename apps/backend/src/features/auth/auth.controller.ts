import { Request, Response } from "express";
import { Webhook } from "svix";
import { ClerkWebhookEvent } from "./auth.type";
import { createUser, deleteUser, updateUser } from "./auth.service";

export const handleClerkWebHook = async (req: Request, res: Response) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error("CLERK_WEBHOOK_SECRET is not set");
    }

    const headers = req.headers;
    const payload = JSON.stringify(req.body);

    const wh = new Webhook(WEBHOOK_SECRET);
    const event = wh.verify(payload, headers as any) as ClerkWebhookEvent;

    const { type, data } = event;

    switch (type) {
      case "user.created":
        await createUser(data);
        break;
      case "user.updated":
        await updateUser(data);
        break;
      case "user.deleted":
        await deleteUser(data.id);
        break;
      default:
        console.log(`Unhandled webhook type: ${type}`);
    }
    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {}
};
