import { Controller, Get, Res, Render, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('landing')
  getHello(@Res() res) {
    return;
  }
}
