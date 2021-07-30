import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(+id);
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
