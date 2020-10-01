import { Injectable, NestMiddleware, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import {Request, Response} from 'express';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { Model } from 'mongoose';
import { Campground } from '../../types/campground';
import { CampgroundService } from '../campground.service';
import { UserService } from '../../shared/user.service';


@UseGuards(AuthenticatedGuard)
@Injectable()
export class OwnershipMiddleware implements NestMiddleware{
    constructor(private campground: CampgroundService, private users: UserService){}
    async use(req: Request, res: Response, next: Function){
        const camp = await this.campground.getACamp(req.params.id);
        // const user = await this.users.getAUser
        const  user = req.user;
        console.log(user);
        console.log(req.user);
        // console.log(user);
        // console.log(req.body);
        // const id  = req.user;
        // console.log(u);
        if(!camp){  
            throw new HttpException(`Campground doesn't exists`, HttpStatus.NOT_FOUND);
         }else{
             if(camp.author.id.equals(user['_id'])){
                next();
            }else{
                throw new HttpException(`You don't have permission to do that!`, HttpStatus.FORBIDDEN);
            }
        }
        
        
        // console.log(req);
        // console.log('--------------------------------------')
        // console.log(res);

    }
}