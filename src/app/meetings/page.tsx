import { api } from "~/trpc/server";
import Meetings from "~/app/_components/Meetings";

export default async function MeetingsPage() {
  const meetings = await api.meeting.getAll.query();

  return <Meetings meetings={meetings} />;
}
