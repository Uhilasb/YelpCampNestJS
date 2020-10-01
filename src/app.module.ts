import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CampgroundModule } from './Campground/campgroung.module';
import { CommentModule } from './comments/comment.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './auth/session.serializer';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';4
// import { OwnershipMiddleware } from './utillities/checkOwnership.middleware';
import { CampgroundService } from './Campground/campground.service';
import { CampgroundController } from './Campground/campground.controller';


// import { CurrentUser } from './utillities/currentUser';
@Module({
  imports: [ CampgroundModule,
    CommentModule,
    MongooseModule.forRoot('mongodb://localhost/yelpCamp1'), 
    AuthModule,
    SharedModule,
    PassportModule.register({
      defaultStrategy:'local',
      session: true,
    })],
  controllers: [AppController],
  providers: [ AppService, AuthService, LocalStrategy,SessionSerializer  ],
})
 export class AppModule{ // implements  NestModule{
  // configure(userContext: MiddlewareConsumer){
  //   userContext
  //   .apply(OwnershipMiddleware)
  //   .forRoutes(
  //     {path:'campgrounds/:id/edit', method: RequestMethod.GET}, 
  //     {path:'campgrounds/:id', method: RequestMethod.PUT},
  //     {path:'campgrounds/:id', method: RequestMethod.DELETE});
  // }
}
