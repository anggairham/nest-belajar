import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService,
    // {
    //   provide:Connection,
    //   useClass: process.env.DATABASE =='mysql' ? MySQLConnection : MongoDBConnection
    // },
    {
      provide:Connection,
      useFactory: createConnection,
      inject:[ConfigService]
    },
    {
      provide:MailService,
      useValue:mailService
    },
    {
      provide:'EmailService',
      useExisting:MailService
    },
    {
      provide:UserRepository,
      useFactory:createUserRepository,
      inject:[Connection],
    },
    MemberService,
  ],
  /**
   * dikarenkan nest js secara default satu module tidak bisa digunakan di module yang lain misalkan user.module tidak bisa langsung digunakan di app.module
   * exports untuk keperluan sharing module 
   * */
  exports:[UserService]
})
export class UserModule {}
