import { PickType } from '@nestjs/swagger';
import { BasePassenger } from './passenger.data';

export class PassengerInput extends PickType(
  BasePassenger, // Base class to pick properties from
  ['firstName', 'lastName'] as const // Picking specific properties to include
) {}
