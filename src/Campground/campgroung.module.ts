import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { CampgroundSchema } from '../models/campground.model'; 
import { CampgroundController } from './campground.controller';
import { CampgroundService} from '../Campground/campground.service';
import { SharedModule } from '../shared/shared.module';
import { Request, Response } from 'express';
import { OwnershipMiddleware } from './middleware/check-ownership.middleware';



@Module({
    imports: [SharedModule,MongooseModule.forFeature([{name: 'Campground', schema: CampgroundSchema}])],
    controllers: [CampgroundController],
    providers: [CampgroundService],
})

export class CampgroundModule implements NestModule {
    configure( consumer: MiddlewareConsumer){
        consumer.apply(OwnershipMiddleware).forRoutes(
            {path:'campgrounds/:id/edit', method: RequestMethod.GET}, 
           {path:'campgrounds/:id', method: RequestMethod.PUT},
           {path:'campgrounds/:id', method: RequestMethod.DELETE});
    }
}