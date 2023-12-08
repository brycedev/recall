import { getBot } from "~/server/api/services/recall";
import { db } from "~/server/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env";
import fetch from "node-fetch";

export async function POST(req: Request) {
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT } = env;

  const body = await req.json();
  const event = body.event;
  const botData = body.data;

  if (event === "bot.status_change") {
    switch (botData.status.code) {
      case "call_ended":
        // the call is over, and no longer active
        await db.meeting.update({
          where: { recallId: botData.bot_id },
          data: { active: false },
        });
        break;
      case "done":
        // bot has completed its recording; let's save the video and audio files
        const recallBot = await getBot({ id: botData.bot_id });
        if (!recallBot.video_url) {
          throw new Error("No video url");
        }
        const dbMeeting = await db.meeting.findUnique({
          where: { recallId: botData.bot_id },
        });

        if (dbMeeting.hasVideo) {
          break;
        }
        // download the file via fetch
        const file = await fetch(recallBot.video_url);

        // upload the file to S3 compatible storage
        const S3 = new S3Client({
          region: "auto",
          endpoint: R2_ENDPOINT,
          credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
          },
        });
        await S3.send(
          new PutObjectCommand({
            Body: new Uint8Array(await file.arrayBuffer()),
            Bucket: "recall",
            Key: "meetings/" + botData.bot_id + "/video.mp4",
            ContentType: "video/mp4",
          }),
        );

        // update the meeting record to indicate that we have the video
        await db.meeting.update({
          where: { recallId: botData.bot_id },
          data: { hasVideo: true },
        });
        break;
      default:
      // non-actionable status
    }
  }
  return Response.json({ success: true });
}
