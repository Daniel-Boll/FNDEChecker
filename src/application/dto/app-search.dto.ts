import { ApiProperty } from "@nestjs/swagger";

export class AppSearchDto {
  @ApiProperty()
  readonly cpf: string;
}
