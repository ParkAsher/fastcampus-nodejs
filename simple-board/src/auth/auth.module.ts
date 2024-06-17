import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([User]), PassportModule],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
