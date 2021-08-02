import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupModule } from "./group/group.module";
import { ApplicationController } from "./application/application.controller";
import { ApplicationService } from "./application/application.service";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    AuthModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class AppModule {}
