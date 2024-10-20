import { PickType } from '@nestjs/swagger';
import { BasePassenger } from './passenger.data';

export class PassengerInput extends PickType(BasePassenger, ['firstName', 'lastName'] as const) {}
