
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private redisClient: Redis | null = null;
  private memory = new Map<string, string>();
  private logger = new Logger(CacheService.name);

  constructor() {
    const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';
    try {
      this.redisClient = new Redis(redisUrl);
      this.redisClient.on('error', (e) => {
        this.logger.warn('Redis error, falling back to in-memory cache: ' + e.message);
        this.redisClient = null;
      });
    } catch (err) {
      this.logger.warn('No redis available, using memory cache');
      this.redisClient = null;
    }
  }

  async get(key: string): Promise<string | null> {
    if (this.redisClient) {
      return await this.redisClient.get(key);
    }
    return this.memory.get(key) ?? null;
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (this.redisClient) {
      if (ttlSeconds) {
        await this.redisClient.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.redisClient.set(key, value);
      }
      return;
    }
    this.memory.set(key, value);
    if (ttlSeconds) {
      setTimeout(() => this.memory.delete(key), ttlSeconds * 1000);
    }
  }
}
