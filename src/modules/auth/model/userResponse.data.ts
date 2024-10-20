import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from './user.data';

export class UserResponseDataWrapper {
  @ApiProperty({ description: 'Wrapped data',type:BaseUser })
  public readonly data: BaseUser;

  public constructor(data: BaseUser) {
      this.data = data;
  }
}

export class UserResponse extends UserResponseDataWrapper{

  public constructor(entity: BaseUser) {
      super(new BaseUser(entity));
  }
}
