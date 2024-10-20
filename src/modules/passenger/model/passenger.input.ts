import { PickType } from '@nestjs/swagger';
import { PassengerInputData } from './passenger.data';

export class PassengerInput extends PickType(PassengerInputData, ['firstName', 'lastName','email','password'] as const) {}
