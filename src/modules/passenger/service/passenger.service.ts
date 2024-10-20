import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { PassengerInput,PassengerResponse, PassengersListResponse } from '../model';

@Injectable()
export class PassengerService {

    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Find all passengers in the database
     *
     * @returns A passenger list
     */
    public async find(): Promise<PassengersListResponse> {
        const passengers = await this.prismaService.passenger.findMany({});

        return new PassengersListResponse(passengers);
    }

    /**
     * Create a new passenger record
     *
     * @param data Passenger details
     * @returns A passenger created in the database
     */
    public async create(data: PassengerInput): Promise<PassengerResponse> {
        const passenger = await this.prismaService.passenger.create({
            data
        });

        return new PassengerResponse(passenger);
    }

}
