
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule =
      await Test.createTestingModule({
        controllers: [AppController],
      }).compile();

    appController =
      app.get<AppController>(AppController);
  });

  describe('status', () => {
    it('should return backend status', () => {
      expect(appController.getStatus()).toEqual({
        status: 'ok',
        message: 'Backend lomba berjalan!',
      });
    });
  });
});
