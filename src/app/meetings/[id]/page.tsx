import Meeting from "~/app/_components/Meeting";
import { getBot } from "~/server/api/services/recall";
import { api } from "~/trpc/server";

export default async function MeetingPage({
  params,
}: {
  params: { id: string };
}) {
  const meeting = await api.meeting.getOne.query({
    id: parseInt(params.id),
  });
  const bot = await getBot({ id: meeting.recallId });
  return <Meeting bot={bot} meeting={meeting} />;
}
