import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Campground } from '../types/campground';
import { CreateCampgroundDTO, UpdateCampgroundDTO } from './campground.dto';
import { User } from '../types/user';

@Injectable()
export class CampgroundService {
        constructor(@InjectModel('Campground') private readonly campground: Model<Campground>){}

        async getCampgrounds(user: User): Promise<Campground[]>{
            const campground = await this.campground.find().exec();
            return campground;
        }
        async getACamp(campId: string):Promise<Campground>{
            const camp = await this.campground.findById(campId);
            return camp;
        }
        async getSingleCampground(campId: string, user: User): Promise<Campground>{
            // const campground = await (await this.findCampground(campId)).populate('comments');
            // return { 
            //     name: campground.name,
            //     image: campground.image,
            //     description: campground.description,
            //     comments: campground.comment
            // }
            const  camp= await this.campground.findById(campId).populate('comments').exec();
            return camp;
        }
        // async getACampground(campId: string, user:User): Promise<Campground>{
        //     const camp = await this.campground.findById(campId);
        //     return camp;
        // }
        async createCampground(name: string, image: string, description: string, user: User): Promise<Campground>{
            const newCampground =  new this.campground({
                name,
                image,
                description,
                author:{
                    id: user._id,
                    username: user.username
                }
            });
            const result = await newCampground.save();
            return result;
        }

        async updateCampground(id: string, name: string, image: string, desc: string): Promise<Campground>{
            // const campground = await this.campground.findById(id);
            // await campground.update(campDTO);
            // return campground;
            const campground = await this.campground.findById(id);
            if(name){
                campground.name = name;
            }
            if(image){
                campground.image = image;
            }
            if(desc){
                campground.description = desc;
            }
             campground.save();
             return campground;
        }
        
        async deleteCampground(id: string): Promise<Campground>{
            const campground = await this.campground.findById(id);
            await campground.remove();
            return campground;
        }
        private async findCampground(id: string, user: User): Promise<Campground>{
            let campground;
            try{
                campground = await this.campground.findById(id);
            }catch(error){
                throw new NotFoundException('Could not find the campground');
            }
            if(!id){
                throw new NotFoundException('Could Not find the campground');
            }
            return campground;
        }
}