import { Controller, Post, Body } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { AppSearchDto } from "./dto/app-search.dto";

@Controller()
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @Post("/")
  async search(@Body() appSearchDto: AppSearchDto) {
    return await this.appService.search(appSearchDto);
  }
}
