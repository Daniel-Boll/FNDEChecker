import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(process.env.GOOGLE_SECRET);
    super({
      clientID:
        "464059833962-h6uurvm725d6ev9p6212eveig0f2ll3k.apps.googleusercontent.com",
      clientSecret: "-_VdVC0yKlh7l-01ccpHBvb2",
      callbackURL: "http://localhost:8000/auth/oauth/redirect",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
