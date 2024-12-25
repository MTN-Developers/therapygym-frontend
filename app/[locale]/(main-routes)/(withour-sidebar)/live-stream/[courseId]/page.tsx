"use client";
import ZoomMeeting from "@/app/components/live/ZoomMeeting";
import { useAppSelector } from "@/app/store/store";
import { useTranslations } from "next-intl";
import React from "react";

const Page = ({
  params: _params,
}: {
  params: {
    courseId: string;
  };
}) => {
  // const [_activeMeeting, setActiveMeeting] = React.useState<any>(null);
  const t = useTranslations("LiveStreamPage");
  // const { isLoading } = useSWR(
  //   `/zoom/meetings/course/${params.courseId}`,
  //   getAll as any,
  //   {
  //     onSuccess: (data) => {
  //       // sort to make the newest date first
  //       setActiveMeeting(
  //         data?.data
  //           ?.sort(
  //             (a: any, b: any) =>
  //               new Date(b.created_at).getTime() -
  //               new Date(a.created_at).getTime()
  //           )
  //           .filter((item: any) => item.is_active)[0]
  //       );
  //     },
  //   }
  // );
  // console.log(/);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
      <h2 className="font-semibold text-xl"> {t("LiveStream")}</h2>
      {/* <p>{params.courseId}</p> */}
      <ZoomMeeting
        client_name={`${user?.name} - ${user?.country}`}
        meetingId={"81297066423"}
        passcode={"169998"}
      />

      {/* ) : activeMeeting ? (
        <ZoomMeeting
          client_name={`${user?.name} - ${user?.country}`}
          meetingId={"81297066423"}
          passcode={"169998"}
          // meetingId={activeMeeting.meeting_id}
          // passcode={activeMeeting.passcode}
        />
      ) : (
        <p>{t("NoActiveMeeting")}</p>
      )} */}
    </div>
  );
};

export default Page;
