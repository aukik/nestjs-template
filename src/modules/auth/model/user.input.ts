import { PickType } from '@nestjs/swagger';
import { UserInputData } from './user.data';

export class UserInput extends PickType(UserInputData, ['firstName', 'lastName','email','password'] as const) {}
