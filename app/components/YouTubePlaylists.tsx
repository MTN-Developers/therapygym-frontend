// "use client";

// import Error from "next/error";
// import React, { SetStateAction, useEffect, useState } from "react";

// interface IProps {
//   channelId: string;
// }

// const YouTubePlaylists = ({ channelId }: IProps) => {
//   const [playlists, setPlaylists] = useState([]);
//   const [error, setError] = useState<SetStateAction<null | string>>(null);

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const response = await fetch(
//           `/api/youtube/playlists?channelId=${channelId}`
//         );
//         const data = await response.json();

//         if (response.ok) {
//           setPlaylists(data.items);
//         } else {
//           setError(data.error || "Failed to fetch playlists");
//         }
//       } catch (err) {
//         console.error("Error fetching playlists:", err);
//         setError("An error occurred while fetching playlists.");
//       }
//     };

//     fetchPlaylists();
//   }, [channelId]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!playlists.length) {
//     return <div>Loading playlists...</div>;
//   }

//   return (
//     <div>
//       <h2>YouTube Playlists</h2>
//       <ul>
//         {playlists.map((playlist) => (
//           <li key={playlist.id}>
//             <h3>{playlist.snippet.title}</h3>
//             <p>{playlist.snippet.description}</p>
//             <img
//               src={playlist.snippet.thumbnails.medium.url}
//               alt={playlist.snippet.title}
//             />
//             {/* Link to the playlist or display more details as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default YouTubePlaylists;
