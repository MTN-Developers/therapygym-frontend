// app/page.jsx or any other page component

import YouTubePlaylists from "@/app/components/YouTubePlaylists";
import React from "react";

const Page = () => {
  const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw"; // Replace with your desired channel ID

  return (
    <main>
      <h1>Welcome to My App</h1>
      <YouTubePlaylists channelId={channelId} />
    </main>
  );
};

export default Page;
