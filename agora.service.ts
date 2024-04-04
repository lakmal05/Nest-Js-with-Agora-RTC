import { Injectable, OnModuleInit } from '@nestjs/common';
// import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { RtcTokenBuilder, RtcRole } from 'agora-token';
import AgoraRTC from 'agora-rtc-sdk-ng';

@Injectable()
export class AgoraService {
  private agoraAppId: string;
  private agoraAppCertificate: string;

  constructor() {
    this.agoraAppId = 'd2b90e8435884022ae50d52c6452847b';
    this.agoraAppCertificate = '9d92fe36dd1a4d1dac8087d4502701dc';
  }

  // async generateToken(channelName: string, uid: number) {
  //   const expirationTimeInSeconds = 3600;
  //   const currentTimestamp = Math.floor(Date.now() / 1000);
  //   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  //   const token = RtcTokenBuilder.buildTokenWithUid(
  //     this.agoraAppId,
  //     this.agoraAppCertificate,
  //     channelName,
  //     uid,
  //     RtcRole.PUBLISHER,
  //     privilegeExpiredTs,
  //   );

  //   return token;
  // }

  // async initiateVoiceCall(
  //   channelName: string,
  //   callerUid: number,
  //   adminUid: number,
  // ) {
  //   //   // Generate tokens for both customer and admin
  //   const customerToken = await this.generateToken(channelName, callerUid);
  //   const adminToken = await this.generateToken(channelName, adminUid);

  //   //   // Initialize Agora RTC SDK
  //   // const agoraClient: any = AgoraRTC.createClient({
  //   //   mode: 'rtc',
  //   //   codec: 'h264',
  //   // });

  //   //   // Initialize the client with your Agora App ID
  //   //   await agoraClient.init(this.agoraAppId);

  //   //   // Join the channel as the customer
  //   //   await agoraClient.join(
  //   //     this.agoraAppId,
  //   //     channelName,
  //   //     customerToken,
  //   //     callerUid.toString(),
  //   //   );

  //   //   // Join the channel as the admin
  //   //   await agoraClient.join(
  //   //     this.agoraAppId,
  //   //     channelName,
  //   //     adminToken,
  //   //     adminUid.toString(),
  //   //   );

  //   //   // Return necessary information for the client to join the call
  //   //   return {
  //   //     channelName,
  //   //     customerToken,
  //   //     adminToken,
  //   //   };
  // }

  async generateRtcToken() {
    const appId = 'd2b90e8435884022ae50d52c6452847b'; // Replace with your Agora App ID
    const appCertificate = '9d92fe36dd1a4d1dac8087d4502701dc'; // Replace with your Agora App Certificate
    const channelName = 'abc'; // Replace with your channel name
    const uid = 1; // Customer UID
    const userAccount = ''; // Replace with your user account
    const role = RtcRole.PUBLISHER; // Define the user role
    const expirationTimeInSeconds = 3600; // Token expiration time

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      expirationTimeInSeconds,
      privilegeExpiredTs,
    );
    console.log('Token With Integer Number Uid: ' + tokenA);

    // Build token with user account
    // const tokenB = RtcTokenBuilder.buildTokenWithUserAccount(
    //   appId,
    //   appCertificate,
    //   channelName,
    //   userAccount,
    //   role,
    //   expirationTimeInSeconds,
    //   privilegeExpiredTs,
    // );
    // console.log('Token With UserAccount: ' + tokenB);
    return { tokenA };
  }

  async tokenG() {
    const appId = 'd2b90e8435884022ae50d52c6452847b';
    const appCertificate = '9d92fe36dd1a4d1dac8087d4502701dc';

    // Common parameters
    const channelName = 'aaa';
    const expirationTimeInSeconds = 3600; // Token expiration time

    // Generate token for customer (uid 1)
    const customerUid = 0;
    const customerRole = RtcRole.PUBLISHER; // Customer can initiate calls

    const customerToken = await this.generateToken(customerUid, customerRole);
    console.log('Customer Token: ' + customerToken);

    // Generate token for admin (uid 2)
    const adminUid = 2;
    const adminRole = RtcRole.SUBSCRIBER; // Admin can answer calls

    const adminToken = await this.generateToken(adminUid, adminRole);
    console.log('Admin Token: ' + adminToken);
    return { customer: customerToken, admin: adminToken };
  }

  generateToken(uid, role) {
    const channelName = 'abc';
    const expirationTimeInSeconds = 3600;
    const appId = 'd2b90e8435884022ae50d52c6452847b';
    const appCertificate = '9d92fe36dd1a4d1dac8087d4502701dc';
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      expirationTimeInSeconds,
      privilegeExpiredTs,
    );

    return token;
  }
}
