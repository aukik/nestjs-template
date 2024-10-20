import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from './user.data';


export class UsersListResponseDataWrapper {
  @ApiProperty({ description: 'Wrapped data', type: [BaseUser] })
  public readonly data: BaseUser[];

  public constructor(data: BaseUser[]) {
      this.data = data;
  }
}

export class UsersListResponse extends UsersListResponseDataWrapper {
  public constructor(entities: BaseUser[]) {
      super(entities.map(entity => new BaseUser(entity)));
  }
}
