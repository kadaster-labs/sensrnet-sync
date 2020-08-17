import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export enum Permissions {
  Mine = 'mine',
  Send = 'send',
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
    description: 'The grant permissions.',
  })
  readonly permissions: string;

}
