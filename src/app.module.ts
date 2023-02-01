import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './Products/products.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/api'), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
