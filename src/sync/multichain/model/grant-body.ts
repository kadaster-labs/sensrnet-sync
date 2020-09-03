import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export enum Permissions {
  Send = 'send',
  Mine = 'mine',
  Issue = 'issue',
  Admin = 'admin',
  Create = 'create',
  Connect = 'connect',
  Receive = 'receive',
  Activate = 'activate',
}

export class GrantBody {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The node address to grant.',
  })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    enum: Permissions,
    description: 'The permissions to grant.',
  })
  readonly permissions: string;

}
