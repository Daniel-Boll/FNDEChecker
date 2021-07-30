import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly groupname: string;
  @ApiProperty()
  readonly IES: string;
  @ApiProperty()
  readonly UF: string;
  @ApiProperty()
  readonly city: string;
}
