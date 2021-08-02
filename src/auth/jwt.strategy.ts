import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
// import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "6Xjy8Ka%yuQQoEGFx!Ntd*g5UrA", // TODO: Put this on jwtConstants.secret
    });
  }

  async validate(payload: any) {
    return { _id: payload.sub, email: payload.email };
  }
}
