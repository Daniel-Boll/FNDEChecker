import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { ApplicationService } from "./application.service";
import { AppSearchDto } from "./dto/app-search.dto";

@Controller()
export class ApplicationController {
  constructor(
    private readonly appService: ApplicationService,
    private authService: AuthService,
  ) {}

  @Post("search")
  async search(@Body() appSearchDto: AppSearchDto) {
    return await this.appService.search(appSearchDto);
  }

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() { user }) {
    return this.authService.login(user);
  }

  @Get("auth/oauth")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Request() req: any) {}

  @Get("auth/oauth/redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Request() req: any) {
    return this.authService.googleLogin(req);
  }
}
