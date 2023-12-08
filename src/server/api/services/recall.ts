import fetch from "node-fetch";
import { env } from "~/env";

const { RECALL_API_KEY } = env;

// helper function to add headers to all requests
const getHeaders = () => {
  return {
    authorization: `Token ${RECALL_API_KEY}`,
    "content-type": "application/json",
  };
};

// POST /api/v1/bot/ wrapper
export async function createBot({
  botName,
  meetingUrl,
}: {
  botName: string;
  meetingUrl: string;
}) {
  const url = "https://api.recall.ai/api/v1/bot/";
  const options = {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      bot_name: botName,
      meeting_url: meetingUrl,
    }),
  };

  return await (await fetch(url, options)).json();
}

// DELETE /api/v1/bot/:id wrapper
export async function deleteBot({ id }: { id: string }) {
  const url = `https://api.recall.ai/api/v1/bot/${id}`;
  const options = {
    method: "DELETE",
    headers: getHeaders(),
  };

  return await (await fetch(url, options)).json();
}

// GET /api/v1/bot/:id wrapper
export async function getBot({ id }: { id: string }) {
  const url = `https://api.recall.ai/api/v1/bot/${id}`;
  const options = {
    method: "GET",
    headers: getHeaders(),
  };

  return await (await fetch(url, options)).json();
}
