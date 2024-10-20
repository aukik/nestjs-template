import { ApiProperty } from '@nestjs/swagger';
import { Passenger  } from '@prisma/client';


export class BasePassenger  {
    public static readonly NAME_LENGTH = 50;

    @ApiProperty({ description: 'Passenger unique ID', example: '36635263' })
    public readonly id: string;

    @ApiProperty({ description: 'Passenger Creation DateTime', example: '2024-10-19T14:44:10.809Z' })
    public readonly createdAt: Date;

    @ApiProperty({ description: 'Passenger Update DateTime', example: '2024-10-19T14:44:10.809Z' })
    public readonly updatedAt: Date;

    @ApiProperty({ description: 'First name', example: 'John' })
    public readonly firstName: string;

    @ApiProperty({ description: 'Last name', example: 'Doe' })
    public readonly lastName: string;


    public constructor(entity: Passenger) {
        Object.assign(this, entity);
    }
}
