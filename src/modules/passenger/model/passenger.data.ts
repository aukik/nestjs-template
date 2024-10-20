import { ApiProperty } from '@nestjs/swagger';
import { Passenger as PassengerPrisma } from '@prisma/client';

//no password necessary in BasePassenger
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

    constructor(entity: PassengerWithoutPassword) {
        Object.assign(this, entity);
    }
}

export class PassengerData extends BasePassenger {
    @ApiProperty({ description: 'Password', example: 'password' })
    public readonly password: string;

    constructor(entity: PassengerPrisma) {
        super(entity);
        this.password = entity.password;
    }
}

export class PassengerResponseDataWrapper {
    @ApiProperty({ description: 'Wrapped data',type:BasePassenger })
    public readonly data: BasePassenger;

    constructor(data: BasePassenger) {
        this.data = data;
    }
}

export class PassengerResponse extends PassengerResponseDataWrapper{

    constructor(entity: BasePassenger) {
        super(new BasePassenger(entity));
    }
}

export class PassengersListResponseDataWrapper {
    @ApiProperty({ description: 'Wrapped data', type: [BasePassenger] })
    public readonly data: BasePassenger[];

    constructor(data: BasePassenger[]) {
        this.data = data;
    }
}

export class PassengersListResponse extends PassengersListResponseDataWrapper {
    constructor(entities: BasePassenger[]) {
        super(entities.map(entity => new BasePassenger(entity)));
    }
}