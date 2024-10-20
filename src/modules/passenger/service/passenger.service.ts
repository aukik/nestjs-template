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
        const passengers = await this.prismaService.passenger.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
        
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
        
        return new PassengerResponse(passenger);
    }

}
