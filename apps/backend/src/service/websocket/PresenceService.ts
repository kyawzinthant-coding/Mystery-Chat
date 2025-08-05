import Redis from "ioredis";

export class PresenceService {
  constructor(private redis: Redis) {}

  async setUserOnline(userId: string) {
    await this.redis.setex(`user:${userId}:online`, 300, "true");
  }

  async setUserOffline(userId: string) {
    await this.redis.del(`user:${userId}:online`);
  }

  async isUserOnline(userId: string): Promise<boolean> {
    const online = await this.redis.get(`user:${userId}:online`);
    return online === "true";
  }
}
