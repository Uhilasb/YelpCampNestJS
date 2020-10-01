import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule, AuthModuleOptions } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { CampgroundController } from 'src/Campground/campground.controller';

@Module({
  controllers: [AuthController],
  imports: [SharedModule,  PassportModule],
  providers: [AuthService , AuthModuleOptions, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
