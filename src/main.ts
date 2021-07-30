import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle("FNDEChecker")
    .setDescription("FNDEChecker's API")
    .setVersion("1.0")
    .addTag("Bolsas")
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "FNDEChecker API",
    // customfavIcon: "https://docs.nestjs.com/assets/logo-small.svg",
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
