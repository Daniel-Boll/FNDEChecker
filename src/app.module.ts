import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupModule } from "./group/group.module";
import { ApplicationController } from "./application/application.controller";
import { ApplicationService } from "./application/application.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://FNDEChecker:${"wHz5XvVmsKxB9Vip"}@fndechecker.utuvw.mongodb.net/FNDEChecker?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    GroupModule,
    HttpModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class AppModule {}
