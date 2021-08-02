import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupService } from "./group.service";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    // TODO: Add validation. Probably to the DTO.
    // docs.nestjs.com/techniques/validation
    return await this.groupService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.groupService.findOne(id);
  }

  @Get("byMail/:email")
  async findByEmail(@Param("email") email: string) {
    return await this.groupService.find({ email });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.groupService.remove(+id);
  }
}
