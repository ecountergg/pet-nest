import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthorsEntity } from './entities/authors.entity';
import { AuthorsService } from './services/authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorsEntity])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
