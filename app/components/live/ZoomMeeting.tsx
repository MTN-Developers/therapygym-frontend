"use client";

import React, { useEffect } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import axios from "axios";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeeting = ({
  client_name,
  meetingId,
  passcode,
}: {
  client_name: string;
  meetingId: string;
  passcode: string;
}) => {
  const meeting_number = meetingId;
  const meeting_password = passcode;
  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const _res = await import("@zoomus/websdk/embedded");

        const { data } = await axios.post("/api/zoom", {
          meetingNumber: meeting_number,
          role: 0,
        });

        ZoomMtg.init({
          leaveUrl: `/live-stream`,

          patchJsMedia: true,
          success: (_success: any) => {
            ZoomMtg.join({
              signature: data.signature,
              meetingNumber: meeting_number as string,
              userName: (client_name as string) || "Client",
              sdkKey: data.sdkKey,
              passWord: meeting_password as string,
              success: (success: any) => {
                console.log(success);
              },
              error: (error: any) => {
                console.log(error);
              },
            });
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    asyncFunction();

    return () => {
      try {
        ZoomMtg.leaveMeeting({
          success: () => {
            // console.log('Meeting left successfully');
          },
          error: (error: any) => {
            console.error("Error leaving meeting:", error);
          },
        });
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [meeting_number, meeting_password, client_name]);
  return <></>;
};

export default ZoomMeeting;
