import { ApiProperty } from '@nestjs/swagger';
import { BasePassenger } from './passenger.data';

export class PassengerResponseDataWrapper {
  @ApiProperty({ description: 'Wrapped data',type:BasePassenger })
  public readonly data: BasePassenger;

  public constructor(data: BasePassenger) {
      this.data = data;
  }
}

export class PassengerResponse extends PassengerResponseDataWrapper{

  public constructor(entity: BasePassenger) {
      super(new BasePassenger(entity));
  }
}
