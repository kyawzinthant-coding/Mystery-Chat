import prisma from "../../lib/prisma";
import { ClerkWebhookEvent } from "./auth.type";
import { verifyToken } from "@clerk/backend";

export const createUser = async (userData: ClerkWebhookEvent["data"]) => {
  try {
    const primaryEmail = userData.email_addresses.find(
      (email) => email.id === userData.email_addresses[0].id
    )?.email_address;

    if (!primaryEmail) {
      throw new Error("No primary email found");
    }

    console.log("userData", userData);

    const name = userData.first_name + " " + userData.last_name;

    const user = await prisma.user.create({
      data: {
        clerkId: userData.id,
        email: primaryEmail,
        imageUrl: userData.image_url,
      },
    });

    console.log("User created:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userData: ClerkWebhookEvent["data"]) => {
  try {
    const primaryEmail = userData.email_addresses.find(
      (email) => email.id === userData.email_addresses[0].id
    )?.email_address;

    if (!primaryEmail) {
      throw new Error("No primary email found");
    }

    const user = await prisma.user.update({
      where: { clerkId: userData.id },
      data: {
        email: primaryEmail,
        imageUrl: userData.image_url,
      },
    });

    console.log("User updated:", user);
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    const user = await prisma.user.delete({
      where: { clerkId },
    });

    console.log("User deleted:", user);
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getUser = async (clerkId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export class AuthService {
  async verifyToken(token: string) {
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      console.log("payload ", payload);
      const user = await getUser(payload.sub as string);
      return {
        name: user?.email,
        userId: user?.clerkId,
        clerkId: user?.clerkId,
      };
    } catch (err) {
      console.error("clerk token verification failed", err);
      throw err;
    }
  }
}
