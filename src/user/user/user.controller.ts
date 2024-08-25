import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  Inject,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';

@Controller('/api/users')
export class UserController {
  /* 
    INI ADA PROPERTY dependency injection
    REKOMENDASI MENGGUNAKAN constructor parameter 
    */
  // @Inject()
  // @Optional() //optional dependency
  // private userService: UserService;
  /* 
    constructor parameter untuk melakukan dependency injection 
    */
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
    @Inject('EmailService') private emailService: MailService,
    private memberService: MemberService,
  ) {}

  @UsePipes(new ValidationPipe(loginUserRequestValidation))
  @UseFilters(ValidationFilter)
  @Post('/login')
  login(
    // @Body(new ValidationPipe(loginUserRequestValidation))
    @Query('name') name: string,
    @Body()
    request: LoginUserRequest,
  ) {
    return `Hello ${request.username}`;
  }

  @Get('/connections')
  async getConnection(): Promise<string> {
    // this.userRepository.save()
    this.mailService.send();
    this.emailService.send();
    // memanggil provider secara manual gunakan module Reference
    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }
  @Get('/create')
  async create(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
  ): Promise<User> {
    // HttpException
    if (!first_name) {
      throw new HttpException(
        {
          code: 400,
          errors: 'first_name is requeired',
        },
        400,
      );
    }
    return this.userRepository.save(first_name, last_name);
  }

  @Get('/hello-service')
  // @UseFilters(ValidationFilter) //diubah jadi global filter
  // ExceptionFilter
  async sayHelloService(@Query('name') name: string): Promise<string> {
    return this.userService.sayHello(name);
  }

  @Get('/view/hello')
  // karena cookie bawaan dari express terpaksa menggunakan Response
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }
  @Get('/set-cookie')
  // karena cookie bawaan dari express terpaksa menggunakan Response
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('success set cookie');
  }
  @Get('/get-cookie')
  // karena cookie bawaan dari express terpaksa menggunakan Response
  getCookie(@Req() request: Request) {
    return request.cookies['name'];
  }

  @Get('/sample-response')
  // tidak perlu menggunakan Response dari express
  // sampleResponse(@Res() res:Response) {
  //     res.status(200).send("Sample Response")
  // res.status(200).json({
  //     data:'Hello World'
  // })
  // }
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello World',
    };
  }
  @Get('redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }
  @Get('/hello-async')
  async sayHelloAsync(
    @Query('first_name') first_name: string,
    @Query('last_name') lastname: string,
  ): Promise<string> {
    return `hello ${first_name} ${lastname}`;
  }
  @Get('/hello')
  // sayHello(@Req() req:Request): string {
  //     return `hello ${req.query.name}`;
  // }
  sayHello(
    @Query('first_name') first_name: string,
    @Query('last_name') lastname: string,
  ): string {
    return `hello ${first_name} ${lastname}`;
  }

  @Get(':id')
  // tidak disarankan menggunakan Request dari express
  // getById(@Req() req:Request): string {
  //     return `GET ${req.params.id}`;
  // }
  // PIPE : MELAKUKAN TRANSFORMASI TIPE DATA SEBELUM DIKIRIM KE Controller METHOD
  getById(@Param('id', ParseIntPipe) id: number): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'post';
  }
  @Get('/sample')
  get(): string {
    return 'getsv';
  }
}
