import fetch from "node-fetch";
import { env } from "~/env";

// instantiate our zoom configuration
const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = env;
const oauthEndpoint = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
const apiEndpoint = "https://api.zoom.us/v2";

// function that acquires the access token via the Zoom OAuth API
// we will attach this to each Zoom API request
async function getToken(): Promise<string> {
  const options = {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(
        `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`,
      ).toString("base64")}`,
      "content-type": "application/json",
    },
  };
  const response = await (await fetch(`${oauthEndpoint}`, options)).json();
  return response.access_token;
}

export async function createMeeting({}) {
  const token = await getToken();
  const meetingEndpoint = `${apiEndpoint}/users/me/meetings`;
  const currentTimestamp = new Date().getTime();
  const body = JSON.stringify({
    host_video: false,
    topic: `Standup ${currentTimestamp}`,
    type: 1,
    settings: {
      join_before_host: true,
      waiting_room: false,
    },
  });

  const options = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body,
  };

  return await (await fetch(meetingEndpoint, options)).json();
}
