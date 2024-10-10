// "use client";
// import React, { useEffect, useRef } from "react";
// import Plyr from "plyr";
// import "plyr/dist/plyr.css";

// const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const player = new Plyr(videoRef.current as any, {
//       controls: ["play", "progress", "volume", "fullscreen", "settings"],
//       settings: ["quality"], // Enable the quality control
//       quality: {
//         default: 720, // Default quality
//         options: [1440, 1080, 720, 480, 360, 240], // Available quality levels
//         // forced: true, // Forces quality change even when not available from the source
//         onChange: (e) => {
//           console.log(`Quality changed to ${e}`);
//         },
//       },
//     });
//     // Cleanup Plyr instance on component unmount
//     return () => {
//       if (player) {
//         player.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="video-player">
//       <video ref={videoRef} className="plyr" playsInline controls>
//         <source src={videoUrl} />
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;
import React from "react";

const VideoPlayer = () => {
  return <div>VideoPlayer</div>;
};

export default VideoPlayer;
