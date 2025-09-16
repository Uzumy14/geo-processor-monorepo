
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/api/process-points (POST) - bad input', async () => {
    const res = await request(app.getHttpServer()).post('/api/process-points').send({});
    expect(res.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
