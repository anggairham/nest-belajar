import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request,Response } from 'express';

@Controller('/api/users')
export class UserController {
    @Get('/sample-response')
    // tidak perlu menggunakan Response dari express
    // sampleResponse(@Res() res:Response) {
    //     res.status(200).send("Sample Response")
        // res.status(200).json({
        //     data:'Hello World'
        // })
    // }
    @Header("Content-Type","application/json")
    @HttpCode(200)
    sampleResponse():Record<string,string> {
        return{
            data:'Hello World'
        }
    }
    @Get('redirect')
    @Redirect()
    redirect(): HttpRedirectResponse{
        return {
            url:"/api/users/sample-response",
            statusCode:301
        }
    }
    @Get('/sample-promise')
    async samplePromise(): Promise<string> {
        return 'get async Promise';
    }
    @Get('/hello')
    // sayHello(@Req() req:Request): string {
    //     return `hello ${req.query.name}`;
    // }
    sayHello(
        @Query("name") name: string,
        @Query("last_name") lastname: string
    ): string {
        return `hello ${name} ${lastname}`;
    }
    
    @Get(':id')
    // tidak disarankan menggunakan Request dari express
    // getById(@Req() req:Request): string {
    //     return `GET ${req.params.id}`;
    // }
    getById(@Param("id") id:string): string {
        return `GET ${id}`;
    }

    @Post()
    post(): string{
        return 'post';
    }
    @Get('/sample')
    get(): string {
        return 'getsv';
    }
}
