import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { GroupModule } from "src/group/group.module";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    GroupModule,
    PassportModule,
    JwtModule.register({
      secret: "6Xjy8Ka%yuQQoEGFx!Ntd*g5UrA", // TODO: Put this on jwtConstants.secret
      // problem: .env not loading here!
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
