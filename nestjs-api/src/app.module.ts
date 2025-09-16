
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GeoService } from './geo.service';
import { CacheService } from './cache.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GeoService, CacheService],
})
export class AppModule {}
