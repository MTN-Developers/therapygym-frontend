export const dynamic = 'force-dynamic';

// app/api/zoom-access-token/route.js
import axios from 'axios';

export async function GET() {
  const CLIENT_ID = 'giQUSRVBT0ynrIqI5Q9Pw'; // Replace with your Zoom Client ID
  const CLIENT_SECRET = '9KOcr6FIdGr5zsYCjWT1S2g1ALwyTOgn'; // Replace with your Zoom Client Secret
  const ACCOUNT_ID = 'azyRWpEUSyiGauZB2aSX3A'; // Replace with your Zoom Account ID

  // Cache the token in memory (Note: This resets on serverless function cold starts)
  let cachedToken: any = null;
  let tokenExpiry: any = null;

  try {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Check if a valid token exists and hasn't expired
    if (cachedToken && tokenExpiry && currentTime < tokenExpiry) {
      return new Response(JSON.stringify({ access_token: cachedToken }), {
        status: 200,
      });
    }

    // Fetch a new token if none exists or the token has expired
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    console.log('Hello from the cache!');
    console.log(credentials);

    const response = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ACCOUNT_ID}`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { access_token, expires_in } = response.data;

    // Cache the new token and set the expiration time
    cachedToken = access_token;
    tokenExpiry = currentTime + expires_in - 60; // Subtract 60 seconds as a buffer

    return new Response(JSON.stringify({ access_token }), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ error: 'Failed to get access token' }), { status: 500 });
  }
}
