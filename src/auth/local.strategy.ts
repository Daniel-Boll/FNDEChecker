import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService, GroupInfoWithoutPassword } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<GroupInfoWithoutPassword> {
    const group = await this.authService.validateUser(email, password);
    if (!group) throw new UnauthorizedException();

    return group;
  }
}
