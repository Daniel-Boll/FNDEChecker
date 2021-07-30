import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop()
  email: string;

  @Prop()
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
