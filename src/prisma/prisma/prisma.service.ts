import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.info('Create prisma service');
  }
  onModuleInit() {
    console.info('Connect Prisma');
    this.$connect();

    // throw new Error('Method not implemented.');
  }
  onModuleDestroy() {
    console.info('Disonnect Prisma');
    this.$disconnect();

    // throw new Error('Method not implemented.');
  }
}
