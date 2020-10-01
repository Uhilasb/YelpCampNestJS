import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../types/comment';
import { createCommentDTO } from './comment.dto';
import { Campground } from '../types/campground';
import { User as UserDocument } from '../types/user';

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment')private comments: Model<Comment>,@InjectModel('Campground') private campground: Model<Campground>){}

    async createAComment( campId: string, text: string, user: UserDocument ): Promise<Campground>{
        const campground = await this.campground.findById(campId);
        const camp =  await this.campground.distinct('comments');
        campground.comments =camp;
        const newComment =new this.comments({
            text: text,
            author:{
                id: user._id,
                username: user.username
            }
        });

        const result = await newComment.save();
        campground.comments.push(result);
        const res = await campground.save();
        return res;
    }

    async getAComment( commentId: string): Promise<Comment>{
        // const camp = await this.campground.findById(id);
        const comment = await this.findComment(commentId);
        // return {
        //     text: comment.text
        // }
        return comment;
    }

    async updateAComment(campId:string, commentId: string, text: string): Promise<Comment>{
        const campground = await this.campground.findById(campId);
        const comment = await this.findComment(commentId);
        
        if(text){
            comment.text = text;
        }
         comment.save();
         campground.comments.push(comment);
         campground.save();
         return comment;
         
    }

    async deleteAcomment(id: string, commentId: string): Promise<Campground>{
        const camp = await this.campground.findById(id);
        const comment = await this.findComment(commentId);
        await comment.remove();
        return camp;
    }

    private async findComment(id: string): Promise<Comment>{
        let comment;
        try{
            comment= await this.comments.findById(id);
        }catch(error){
            throw new NotFoundException('Could not find a comment ');
        }
        if(!id){
            throw new NotFoundException('Could not find the comment, the id is missing');
        }

        return comment;
    }
}
