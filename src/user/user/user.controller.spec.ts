import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http'
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should can say hello', async () => {
    const response = await controller.sayHelloAsync('Angga','Irham')
    expect(response).toBe('hello Angga Irham')
  });
  it('should can say hello service', async () => {
    const response = await controller.sayHelloService('Angga')
    expect(response).toBe('Hello Angga')
  });

  it('should can get view', async () => {
    const response = httpMock.createResponse()
    controller.viewHello('Angga',response)

    expect(response._getRenderView()).toBe('index.html')
    expect(response._getRenderData()).toEqual({
      name:'Angga',
      title:'Template Engine'
    })
  });
});
