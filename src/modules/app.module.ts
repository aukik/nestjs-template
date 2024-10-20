import { Module } from '@nestjs/common';
import { UserModule } from './auth/user.module';
import { CommonModule } from './common';
import { PassengerModule } from './passenger/passenger.module';


@Module({
    imports: [
        CommonModule,
        PassengerModule,
        UserModule
    ]
})
export class ApplicationModule {}
