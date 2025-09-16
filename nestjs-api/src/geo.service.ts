
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from './cache.service';

@Injectable()
export class GeoService {
  private readonly logger = new Logger(GeoService.name);
  private pythonUrl = process.env.PYTHON_URL || 'http://python-service:8000/process-points';

  constructor(private cacheService: CacheService) {}

  private keyFromPoints(points: any[]): string {
    return JSON.stringify(points.map(p => [p.lat, p.lng]).sort());
  }

  async process(payload: { points: any[] }) {
    if (!payload || !Array.isArray(payload.points)) {
      this.logger.error('Invalid payload: "points" is missing or not an array');
      throw new Error('Invalid payload: "points" is required and must be an array');
    }

    const key = this.keyFromPoints(payload.points);
    const cached = await this.cacheService.get(key);
    if (cached) {
      this.logger.debug('Cache hit');
      return JSON.parse(cached);
    }

    this.logger.debug('Cache miss, calling python-service with payload: ' + JSON.stringify(payload));
    try {
      const resp = await axios.post(
        this.pythonUrl,
        payload,
        { headers: { "Content-Type": "application/json" }, timeout: 5000 }
      );
      this.logger.debug(`python-service response: ${JSON.stringify(resp.data)}`);
      await this.cacheService.set(key, JSON.stringify(resp.data), 3600);
      return resp.data;
    } catch (err: any) {
      if (err.response) {
        this.logger.error(`Python service error: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
      } else {
        this.logger.error(`Error calling python-service: ${err.message}`);
      }
      throw err;
    }
  }
}
