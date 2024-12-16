"use client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
const PlyrVideo = ({ src }: { src: string }) => {
  return (
    <Plyr
      color="rgba(134,124,205,0.18)"
      options={{
        quality: {
          default: 576, // Default quality (ensure it matches one of your source sizes)
          forced: true, // Allow the user to switch quality
          options: [360, 480, 576, 720, 1080], // Available quality options
          // onChange: quality => {
          //   // console.log(`Quality changed to: ${quality}`);
          // },
        },
      }}
      source={{
        type: "video",
        title: "",
        poster: "",
        sources: [
          {
            src: src,
            type: "video/mp4",
            size: 576,
          },
        ],
      }}
    />
  );
};
export default PlyrVideo;
