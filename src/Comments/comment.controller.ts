import { Controller, Post, Get, Put, Delete, Param, Body, Request, Res, UseGuards, Render, Req, Query} from '@nestjs/common';
import { CommentService } from './comment.service';
import { User } from '../utillities/user.decorator';
import { User as UserDocument } from '../types/user';
import { CampgroundService } from 'src/Campground/campground.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('campgrounds/:id/comments')
export class CommentController {
    constructor(private comments: CommentService, private campground: CampgroundService){}
   
    @UseGuards(AuthenticatedGuard)
    @Render('newComment')
    @Get('new')
    async showNew(@Req() req, @Res() res){
        console.log(req.params.id);
        console.log(req.user);
        const camp= await this.campground.getSingleCampground(req.params.id, req.user);
        return {campground: camp, currentUser: req.user};
    }
    @Post()
    // @UseGuards(LoginGuard)
    async createComment(@Request() req,  @Body('text') text: string, @Res() res){

        const comment = await this.comments.createAComment(req.params.id, req.body.text, req.user);

        return res.redirect('/campgrounds/'+req.params.id);
    }

    // @Get('new')
    // @UseGuards(AuthenticatedGuard)
    // async getAComment(@Request() req){
    //     const campground = await this.campground.getSingleCampground(req.params.id, req.user);

    //     return campground;
    // }


    @UseGuards(AuthenticatedGuard)
    @Render('editComment')
    @Get(':comment_id/edit')
    async getEditComment( @Param('comment_id') comment_id: string,@Req() req, @Res() res){
        const camp = await this.campground.getSingleCampground(req.params.id, req.user);
        const c = await this.comments.getAComment(comment_id);
        console.log(req.params.id);
        console.log(comment_id);
        return {campground: camp, comment: c, currentUser: req.user};
    }
    
    @Put(':comment_id')
    async updateComment(@Req() req, @Body('text') text:string, @Res() res){
         console.log(req.params.comment_id);
        const comment = await this.comments.updateAComment(req.params.id, req.params.comment_id, text);
        return res.redirect('/campgrounds/'+req.params.id);
    }
    @UseGuards(AuthenticatedGuard)
    @Delete(':comment_id')
    async deleteComment(@Request() req, @Res() res){
        const comment = await this.comments.deleteAcomment(req.params.id, req.params.comment_id);
        return res.redirect('/campgrounds/'+ req.params.id);
    }
}