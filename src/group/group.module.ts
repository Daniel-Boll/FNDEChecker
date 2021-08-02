import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { Group, GroupSchema } from "./schemas/group.schema";
import { PasswordEncryptionMiddleware } from "src/password-encryption.middleware";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PasswordEncryptionMiddleware)
      .forRoutes({ path: "group", method: RequestMethod.POST });
  }
}
