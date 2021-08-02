import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { GroupService } from "src/group/group.service";
import { Group } from "src/group/schemas/group.schema";

export type GroupInfoWithoutPassword = Omit<Group, "password">;

@Injectable()
export class AuthService {
  constructor(
    private groupService: GroupService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<GroupInfoWithoutPassword | null> {
    const group = await this.groupService.find({ email });

    if (group && (await bcrypt.compare(pass, group.password))) return group;

    return null;
  }

  async login(group: any) {
    const payload = { email: group.email, sub: group._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  googleLogin(req: any) {
    if (!req.user) return "No user from google";

    return { message: "User information from google", user: req.user };
  }
}
