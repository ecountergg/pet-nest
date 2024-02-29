import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublishersEntity } from './entities/publishers.entity';
import { PublisherController } from './publishers.controller';
import { PublishersService } from './services/publishers.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublishersEntity])],
  controllers: [PublisherController],
  providers: [PublishersService],
  exports: [PublishersService],
})
export class PublishersModule {}
