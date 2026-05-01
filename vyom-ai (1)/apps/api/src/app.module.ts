import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ScansModule } from './modules/scans/scans.module';
import { ProductsModule } from './modules/products/products.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ScansModule,
    ProductsModule,
    ComplaintsModule,
  ],
})
export class AppModule {}
