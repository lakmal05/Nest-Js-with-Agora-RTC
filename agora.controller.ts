import { Body, Controller, Get, Post } from '@nestjs/common';
// import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { AgoraService } from './agora.service';
// import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
// import { RtcTokenBuilder, RtmTokenBuilder, RtcRole } from 'agora-token';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { randomUUID } from 'crypto';
@Controller('agora')
export class AgoraController {
  constructor(private readonly agoraService: AgoraService) {}

  @Get('call')
  generateAgoraToken(
    // appId,
    // appCertificate,
    // channelName,
    userId: number,
    role = RtcRole.PUBLISHER,
    expirationTimeInSeconds = 3600,
  ) {
    const APP_ID = 'd2b90e8435884022ae50d52c6452847b'; // Replace with your Agora App ID
    const APP_CERTIFICATE = '9d92fe36dd1a4d1dac8087d4502701dc'; // Replace with your Agora App Certificate
    const USER_ID = 3000;
    const CHANNEL_NAME = `abc`;

    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

      const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        CHANNEL_NAME,
        USER_ID,
        role,
        privilegeExpiredTs,
      );
      return {
        token: token,
        app_Id: APP_ID,
        channel_name: CHANNEL_NAME,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('token')
  token() {
    // return this.agoraService.generateRtcToken();
    return this.agoraService.tokenG();
  }
}
