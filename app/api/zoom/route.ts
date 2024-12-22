import { NextResponse } from 'next/server';

const KJUR = require('jsrsasign');

export const POST = async (req: Request) => {
  const body = await req.json();

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const Header = { alg: 'HS256', typ: 'JWT' };

  const payload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    appKey: process.env.ZOOM_SDK_KEY,
    mn: body.meetingNumber,
    role: body.role,
    iat,
    exp,
  };

  const sHeader = JSON.stringify(Header);
  const sPayload = JSON.stringify(payload);

  const meetingSignature = KJUR.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET);

  return NextResponse.json({
    signature: meetingSignature,
    sdkKey: process.env.ZOOM_SDK_KEY,
  });
};
