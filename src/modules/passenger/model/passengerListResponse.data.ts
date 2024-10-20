import { ApiProperty } from '@nestjs/swagger';
import { BasePassenger } from './passenger.data';


export class PassengersListResponseDataWrapper {
  @ApiProperty({ description: 'Wrapped data', type: [BasePassenger] })
  public readonly data: BasePassenger[];

  public constructor(data: BasePassenger[]) {
      this.data = data;
  }
}

export class PassengersListResponse extends PassengersListResponseDataWrapper {
  public constructor(entities: BasePassenger[]) {
      super(entities.map(entity => new BasePassenger(entity)));
  }
}
