import { Controller, Post, Body, Get, Param, Patch, Delete, Request, Res, Render, UseGuards, Redirect, Req } from '@nestjs/common';
import { Response, request } from 'express';
import { CampgroundService } from './campground.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { performance } from 'perf_hooks';


@Controller('campgrounds')
export class CampgroundController{
    constructor(private campgroundServie: CampgroundService){}
    
@UseGuards(AuthenticatedGuard)
@Get()
@Render('campgrounds')
    async listAll(@Request() req, @Res() res){
        // console.log(req.user);
        const t1 = performance.now();
        const user= await this.campgroundServie.getCampgrounds(req.user);
        console.log(`The get request to get all posts took   ${performance.now() - t1}  miliseconds`);
        return { campgrounds: user, currentUser: req.user  };

        
}

@Get('new')
@Render('new')
async newPost(@Res() res, @Req() req){
   return {currentUser: req.user};
}

@Post()
 async create(
        @Body('name')  campName: string,
        @Body('image') campImg: string,
        @Body('description') campDesc: string,
        @Request() req,
        @Res() res
    ){
        const t1 = performance.now();
        const camp =await this.campgroundServie.createCampground(campName, campImg, campDesc, req.user);
        console.log(`To add a new post took  ${performance.now() - t1}  miliseconds`);
        return res.redirect('campgrounds');
        
}
    
@UseGuards(AuthenticatedGuard)
@Render('show')
@Get(':id')
async getOneCampground(@Param('id') id: string, @Request() req){
    const result= await this.campgroundServie.getSingleCampground(id, req.user);
    return {campground:result, currentUser: req.user};
}
@UseGuards(AuthenticatedGuard)
@Render('edit')
@Get(':id/edit')
async editCamp(@Param('id') id: string, @Request() req){
    console.log(id);
    const camp = await this.campgroundServie.getSingleCampground(id, req.user);
    return { campground: camp, currentUser:req.user};
}

@Patch(':id')
async update(@Param('id') id:string, @Res() res, 
            @Body('name') name: string, @Body('image') image:string, @Body('description') desc: string){
    console.log(id);
    const t1 = performance.now();
    const result = await this.campgroundServie.updateCampground(id, name, image, desc);
    console.log(`To Edit a post took  ${performance.now() -t1}   miliseconds`);            
    return res.redirect(''+id);
}
@UseGuards(AuthenticatedGuard)
@Delete(':id')
async delete(@Param('id') id:string, @Res() res){
    const t1 = performance.now();
    const result = await this.campgroundServie.deleteCampground(id);
    console.log(`To delete a post took  ${performance.now() - t1} miliseconds`);
    return res.redirect('/campgrounds');
 }
}