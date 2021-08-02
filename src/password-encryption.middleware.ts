import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class PasswordEncryptionMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    if (req.body.password)
      req.body.password = await bcrypt.hash(req.body.password, 10);

    next();
  }
}
