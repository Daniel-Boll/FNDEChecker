import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { Group, GroupSchema } from "./schemas/group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
