import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../types/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../types/payload';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    private sanitezeUser(user: User){
        return user.depopulate('password');
    }
    async findAll(): Promise<User[]>{
        return await this.userModel.find();
    }

    async findOne(userId: any): Promise<User>{
        return await this.userModel.findOne({userId});
 
    }
    async getAUser(user: User){
        const userr= await this.userModel.findOne({user});
        return userr;
    }
    
    async create(userDTO: RegisterDTO){
        const { username } = userDTO;
        const user = await this.userModel.findOne({ username});
        if(user){
            throw new HttpException('User already exits', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitezeUser(createdUser);
    }

    async findByLogin(username: string, password:string): Promise<User | undefined>{
        
        const user = await this.userModel.findOne({ username });
        if(!user){
            throw new HttpException('Invalid Credentials!', HttpStatus.UNAUTHORIZED);
        }
        if( bcrypt.compare(password, user.password)){
            return  this.sanitezeUser(user);
        }else{
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: any){
        const { username } = payload;
        return await this.userModel.findOne({ username  });
    }
}
 