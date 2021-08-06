import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class KeyParams {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The address to retrieve a private key for.',
    })
    readonly address: string;
}
