import { Body, Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Config, LoggerService, RestrictedGuard } from '../../common';
import { Service } from '../../tokens';

import { UserPipe } from '../flow';
import {  UserInput, UsersListResponse, UserResponse } from '../model';
import { UserService } from '../service';

@Controller('users')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly userService: UserService
    ) { }

    // Get list of all Users
    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find Users' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of Users',
        type: UsersListResponse
    })
    public async find(): Promise<UsersListResponse> {
        const users = await this.userService.find();
        return users;
    }


    // Post a User
    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create User' })
    @ApiResponse({ status: HttpStatus.CREATED, description:'Data of the newly created User',type: UserResponse })
    public async create(@Body(UserPipe) input: UserInput): Promise<UserResponse> {

        if (this.config.PASSENGERS_ALLOWED === 'no') {
            throw new PreconditionFailedException('Not allowed to onboard users');
        }

        const user = await this.userService.create(input);
        this.logger.info(`Created new User with ID ${user.data.id}`);

        return user;
    }

}
