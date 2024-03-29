import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group, GroupDocument } from "./schemas/group.schema";

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<GroupDocument> {
    const createdGroup = new this.groupModel(createGroupDto);
    return createdGroup.save();
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  async find(match: { [type: string]: string }): Promise<Group> {
    return this.groupModel.findOne(match).exec();
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
