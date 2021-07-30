import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ContactSchema } from "./contact.schema";

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  groupname: string;

  @Prop({ required: true })
  IES: string;

  @Prop({ required: true })
  UF: string;

  @Prop({ required: true })
  city: string;

  // @Prop(
  //   raw({
  //     cpf: { type: String },
  //     contacts: [{ type: ContactSchema }],
  //   }),
  // )
  // members: Record<string, any>;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
