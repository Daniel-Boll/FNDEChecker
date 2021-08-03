import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";
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
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req: any) {
    if (!req.user) return "No user from google";
    const { accessToken } = req.user;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // NOTE: It might be a good idea to use sub and store it too
    // in the database. But for the sake of time we won't change
    // the group model yet.
    const {
      data: { email, email_verified },
    } = await axios.get("https://oauth2.googleapis.com/tokeninfo", {
      headers,
    });

    if (!email_verified)
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: "Google account not verified",
        },
        HttpStatus.NOT_ACCEPTABLE,
      );

    const group = await this.groupService.find({ email });

    // Redirect to group register.
    if (!group)
      return { status: HttpStatus.ACCEPTED, message: "Register group", email };

    return {
      status: HttpStatus.CONTINUE,
      message: "User information from google",
      user: req.user,
    };
  }
}
