import { Injectable, NestMiddleware, MiddlewareConsumer, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CommentService } from '../comment.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { Request, Response } from 'express';
import { CampgroundService } from '../../Campground/campground.service';

@UseGuards(AuthenticatedGuard)
@Injectable()
export class CommentOwnership implements NestMiddleware{
        constructor(private comments: CommentService, private campground: CampgroundService){}
        async use(req: Request, res: Response, next: Function){
            const camp = await this.campground.getACamp(req.params.id);
            const comment= await this.comments.getAComment(req.params.comment_id)
            const user = req.user;

            console.log(comment);
            console.log(camp);
            console.log(req.user);
            if(!camp){
                throw new HttpException(`The comment does'nt exists!`, HttpStatus.NOT_FOUND);
            }else{
                if(camp.author.id.equals(user['_id'])){
                    next();
                }else{
                    throw new HttpException(`You don't have permission to do that!`, HttpStatus.FORBIDDEN);
                }
            }
        }
 }

