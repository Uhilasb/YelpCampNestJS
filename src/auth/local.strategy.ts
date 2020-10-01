import { Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy, AuthModuleOptions } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { Payload } from "../types/payload";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService, private readonly options: AuthModuleOptions){
        // super({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //     secretOrKey: 'secretKey',
        // });
        super();
    }

    async validate(username: string, pass: string){
        const user = await this.authService.validateUser(username, pass);
        if(!user){
            throw new UnauthorizedException('Nuk po bon diqka!');
        } 
        return user;
    }
    public successRedirect: string= this.options['/campgrounds'];
    public failureRedirect: string= this.options['/login'];
}