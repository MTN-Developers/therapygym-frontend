"use client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import React, { useEffect, useRef } from "react";

const PlyrVideo = ({ src }: { src: string }) => {
  const plyrRef = useRef(null);

  useEffect(() => {
    const player = plyrRef.current?.plyr;

    if (player) {
      player?.on("timeupdate", function (e) {
        console.log(e, "TIMEUPDATE");
      });
      player.on("seeked", function (e) {
        console.log(e, "SEEKED");
      });
      // Add other event listeners if needed
    }

    return () => {
      if (player) {
        player.off("timeupdate");
        player.off("seeked");
      }
    };
  }, []);

  const playerOptions = {
    debug: true,
    enabled: true,
    quality: {
      default: 576,
      forced: true,
      options: [360, 480, 576, 720, 1080],
    },
    storage: {
      enabled: false,
      key: "plyr",
    },
    markers: {
      enabled: true,
      points: [
        { time: 100, label: "Marker 1" },
        { time: 200, label: "Marker 2" },
      ],
    },
  };

  return (
    <Plyr
      ref={plyrRef}
      color="rgba(134,124,205,0.18)"
      options={playerOptions}
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
