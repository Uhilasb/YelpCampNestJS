import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/shared/user.service';
import { sign } from 'jsonwebtoken';
import { Payload } from '../types/payload';
import * as bcrypt from 'bcrypt';
import { User } from '../types/user';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signByPayload(payload: Payload){
        return sign(payload, 'secretKey', {expiresIn: '12h'});
    }

    async validateUser(username: string, pass: string): Promise<User>{
    // async validateUser(payload: Payload){ 
        // return await this.userService.findByPayload(payload);

        const user = await this.userService.findByLogin(username, pass);
        if(user && bcrypt.compare(pass, user.password)){
            // const { password, ...result} = user;
            const password = user.password;
            const result  = user;
            return result;
        }
        return null;
    }
}
    