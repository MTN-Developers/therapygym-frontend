import axios from "axios";
import { NextResponse } from "next/server";

const ZOOM_API_URL = "https://api.zoom.us/v2";

// Helper function to get access token

export async function POST() {
  try {
    // console.log('meeting id is', process.env.NEXT_PUBLIC_ZOOM_MEETING_NUMBER);
    const { data } = await axios.get(
      `${ZOOM_API_URL}/meetings/${process.env.NEXT_PUBLIC_ZOOM_MEETING_NUMBER}`,
      {
        headers: {
          Authorization: `Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImYxNjQxMDA5LTAxOTgtNDk2Yi04ZTI5LWMwM2VlYTJlMDg3YiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiIydW9nUFhYMFNIaUx1TWxjMkJrWi1RIiwidmVyIjoxMCwiYXVpZCI6IjhlZjFlNTdkMTgxNzlkMzYzZTliZDJjZTY0OTFmMTY2NjlkYTIyYjU3MDVhYjY0ZGJjMDg3ZGE5ODkwZTAyMTYiLCJuYmYiOjE3MzIyMzE2ODksImNvZGUiOiIwUHd6SC1nV1NIeW9ST3UtMmxuZEFRUm5JOFVKNG04UmgiLCJpc3MiOiJ6bTpjaWQ6TFJRN29uZ0tSUjJPTmJDQXhUempuZyIsImdubyI6MCwiZXhwIjoxNzMyMjM1Mjg5LCJ0eXBlIjozLCJpYXQiOjE3MzIyMzE2ODksImFpZCI6ImF6eVJXcEVVU3lpR2F1WkIyYVNYM0EifQ.xKgLV5zLim75Su7J0XYbFCSNeuyuG5tKYEF6gDonNcZ-RmG6w7Dg9pGfwF7i7Fvm1Gw8mHUY4XAZo0XPHSpiyw`,
        },
      }
    );
    // console.log(data);
    return NextResponse.json({ status: data.status }); // Possible statuses: 'waiting', 'started', 'ended'
  } catch (error: any) {
    console.error(
      "Error fetching meeting status:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting status" },
      { status: 500 }
    );
  }
}
