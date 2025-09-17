import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { GeoService } from '../src/geo.service';
import { ProcessPointsDto } from '../src/dto/process-points.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

describe('AppController', () => {
  let appController: AppController;
  let geoService: GeoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: GeoService,
          useValue: {
            process: jest.fn().mockResolvedValue({
              centroid: { lat: 37.3825, lng: -96.12485 },
              bounds: {
                north: 40.7128,
                south: 34.0522,
                east: -74.006,
                west: -118.2437,
              },
            }),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    geoService = module.get<GeoService>(GeoService);
  });

  it('should process points and return centroid + bounds', async () => {
    // 🔹 We simulate the flat body received in the request
    const rawBody = {
      points: [
        { lat: 40.7128, lng: -74.006 },
        { lat: 34.0522, lng: -118.2437 },
      ],
    };

    // 🔹 We transform it into a DTO, as NestJS would do with ValidationPipe
    const dto = plainToInstance(ProcessPointsDto, rawBody);
    
// 🔹 We validate with class-validator (simulates the ValidationPipe)
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);

    // 🔹 We call the controller
    const result = await appController.processPoints(dto);

    // 🔹 We verify the expected result
    expect(result.centroid).toHaveProperty('lat');
    expect(result.bounds).toHaveProperty('north');

    // 🔹 We verify that geoService.process received ONLY the points array
    expect(geoService.process).toHaveBeenCalledWith(dto);

  });
});
