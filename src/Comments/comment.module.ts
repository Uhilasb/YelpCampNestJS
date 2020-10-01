import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from '../models/comment.model';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CampgroundModule } from 'src/Campground/campgroung.module';
import { CampgroundController } from 'src/Campground/campground.controller';
import { CampgroundService } from 'src/Campground/campground.service';
import { CampgroundSchema } from 'src/models/campground.model';
import { SharedModule } from 'src/shared/shared.module';
import { CommentOwnership } from './middleware/check-ownership.middleware';

@Module({
    imports: [CampgroundModule, SharedModule, 
        MongooseModule.forFeature([{name: 'Comment', schema: CommentSchema }, {name: 'Campground', schema: CampgroundSchema}]),
            ],
    controllers: [CommentController, CampgroundController],
    providers: [CommentService, CampgroundService],
})
export class CommentModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(CommentOwnership)
        .forRoutes(
            {path: 'campgrounds/:id/comments/:comment_id/edit', method: RequestMethod.GET},
            {path: 'campgrounds/:id/comments/:comment_id', method: RequestMethod.PUT},
            {path:'campgrounds/:id/comments/:comment_id', method: RequestMethod.DELETE}
            );

    }
}
