import { Module } from '@nestjs/common';
import { AgoraService } from './agora.service';
import { AgoraController } from './agora.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AgoraService, ConfigService],
  controllers: [AgoraController],
})
export class AgoraModule {}
