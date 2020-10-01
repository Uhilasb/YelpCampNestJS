import { Injectable } from "@nestjs/common";
import {  PassportSerializer } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserService } from "../shared/user.service";
import { User } from "../types/user";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ){
        super();
    }
    serializeUser(user: any, done: (err: any, id?: any)=> void ): void{
            done(null, user);
    }   
    async deserializeUser(payload: any, done: (err: any, id?:any)=> void ){
            done(null, payload);
    }
}
