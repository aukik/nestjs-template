import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { UserInput, UserResponse, UsersListResponse } from '../model';

@Injectable()
export class UserService {

    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Find all Users in the database
     *
     * @returns A User list
     */
    public async find(): Promise<UsersListResponse > {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });


        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new UsersListResponse(users);
    }

    /**
     * Create a new User record
     *
     * @param data User details
     * @returns A User created in the database
     */
    public async create(data: UserInput): Promise<UserResponse> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const user = await this.prismaService.user.create({
            data,
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                firstName: true,
                lastName: true,
                email: true,
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new UserResponse(user);
    }

}
