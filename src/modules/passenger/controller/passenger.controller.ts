import { Body, Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Config, LoggerService, RestrictedGuard } from '../../common';
import { Service } from '../../tokens';

import { PassengerPipe } from '../flow';
import {  PassengerInput, PassengersListResponse, PassengerResponse } from '../model';
import { PassengerService } from '../service';

@Controller('passengers')
@ApiTags('passenger')
@ApiBearerAuth()
export class PassengerController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly passengerService: PassengerService
    ) { }

    // Get list of all passengers
    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find passengers' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of passengers',
        type: PassengersListResponse
    })
    public async find(): Promise<PassengersListResponse> {
        const passengers = await this.passengerService.find();
        return passengers;
    }


    // Post a passenger
    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create passenger' })
    @ApiResponse({ status: HttpStatus.CREATED, description:'Data of the newly created Passenger',type: PassengerResponse })
    public async create(@Body(PassengerPipe) input: PassengerInput): Promise<PassengerResponse> {

        if (this.config.PASSENGERS_ALLOWED === 'no') {
            throw new PreconditionFailedException('Not allowed to onboard passengers');
        }

        const passenger = await this.passengerService.create(input);
        this.logger.info(`Created new passenger with ID ${passenger.data.id}`);

        return passenger;
    }

}
