import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddressParams {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The address of the node.',
  })
  readonly address: string;
}
