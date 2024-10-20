import { ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

// no password necessary in BaseUser
type UserWithoutPassword = Omit<UserPrisma, 'password'>;
type UserWithPassword = UserWithoutPassword & { password: string };

export class BaseUser implements UserWithoutPassword {
    public static readonly NAME_LENGTH = 50;

    @ApiProperty({ description: 'User unique ID', example: '36635263' })
    public readonly id: string;

    @ApiProperty({ description: 'User Creation DateTime', example: '2024-10-19T14:44:10.809Z' })
    public readonly createdAt: Date;

    @ApiProperty({ description: 'User Update DateTime', example: '2024-10-19T14:44:10.809Z' })
    public readonly updatedAt: Date;

    @ApiProperty({ description: 'First name', example: 'John' })
    public readonly firstName: string;

    @ApiProperty({ description: 'Last name', example: 'Doe' })
    public readonly lastName: string;

    @ApiProperty({ description: 'Email', example: 'test@dev.com' })
    public readonly email: string;

    public constructor(entity: UserWithoutPassword) {
        Object.assign(this, entity);
    }
}

export class UserInputData extends BaseUser {
    @ApiProperty({ description: 'Password', example: 'password' })
    public readonly password: string;

    public constructor(entity: UserWithPassword) {
        super(entity);
        this.password = entity.password;
    }
}
