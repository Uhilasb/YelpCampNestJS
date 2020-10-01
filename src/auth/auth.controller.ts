import { Controller, Post, Body, Get, UseGuards, Request, Render, Res, Req } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Payload } from '../types/payload';
import { User } from '../utillities/user.decorator';
import { User as UserDocument } from '../types/user';
import { Response } from 'express';

import { LoginGuard } from '../common/guards/login.guard';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
 
@Controller()
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService){}
    
    @Get('login')
    @Render('login')
    async logIn(@Req() req: Request){
        
        return;
    }   

    @Get('register')
    @Render('register')
    async registerRoute(@Req() req: Request){
        return;
    }

    @UseGuards(LoginGuard)
    // @UseGuards(AuthenticatedGuard)/
    @Post('login')
    async login(@Body('username') username: string,@Body('password') password: string, @Res() res ): Promise<UserDocument>{
        
        // const user = await this.userService.findByLogin(username, password);
        
        const user = await this.authService.validateUser(username, password);
        return res.redirect('campgrounds');
        
       
       
    }

    @Post('register')

    async register(@Body() userDTO: RegisterDTO, @Res() res){
       const user = await this.userService.create(userDTO);
       const payload: Payload = {
           username: user.username,
       }
       const token = await this.authService.signByPayload(payload);
       return res.redirect('campgrounds');
    }
    @Get('logout')
    async logout(@Req() req, @Res() res){
        req.logout();
        res.redirect('/');
    }
}
