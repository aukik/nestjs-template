import { ApiProperty } from '@nestjs/swagger';
import { Passenger as PassengerPrisma } from '@prisma/client';

// no password necessary in BasePassenger
type PassengerWithoutPassword = Omit<PassengerPrisma, 'password'>;

export class BasePassenger implements PassengerWithoutPassword {
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

    @ApiProperty({ description: 'Email', example: 'test@dev.com' })
    public readonly email: string;

    public constructor(entity: PassengerWithoutPassword) {
        Object.assign(this, entity);
    }
}

export class PassengerInputData extends BasePassenger {
    @ApiProperty({ description: 'Password', example: 'password' })
    public readonly password: string;

    public constructor(entity: PassengerPrisma) {
        super(entity);
        this.password = entity.password;
    }
}
