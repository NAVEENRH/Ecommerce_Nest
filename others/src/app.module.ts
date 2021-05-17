import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // register the modules : features
    TypeOrmModule.forRoot(),
    ProductModule,
    AuthModule,
  ],
  controllers: [
    // register the controller
    AppController,
  ],
  providers: [
    // register the services
    AppService,
  ],
})
export class AppModule {}
