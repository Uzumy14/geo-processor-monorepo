import { Body, Controller, Post, UsePipes, ValidationPipe, Logger, HttpException } from '@nestjs/common';
import { ProcessPointsDto } from './dto/process-points.dto';
import { GeoService } from './geo.service';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly geoService: GeoService) {}

  @Post('process-points')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
  async processPoints(@Body() body: ProcessPointsDto) {
    try {
      this.logger.debug(`Received payload: ${JSON.stringify(body)}`);
      const result = await this.geoService.process(body);
      return result;
    } catch (err) {
      this.logger.error(`Error in processPoints: ${err.message}`, err.stack);
      throw new HttpException(
        { message: 'Failed to process points', error: err.message },
        500,
      );
    }
  }
}

