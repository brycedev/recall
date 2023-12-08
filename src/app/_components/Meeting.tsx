"use client";

import { type Meeting } from "@prisma/client";
import { Layout } from "./Layout";
import { Container } from "./Container";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { CircleDashed } from "lucide-react";
import { api } from "~/trpc/react";
import { env } from "~/env";

export default function Meeting({
  bot,
  meeting,
}: {
  bot: unknown;
  meeting: Meeting;
}) {
  const { NEXT_PUBLIC_R2_DOMAIN } = env;
  const router = useRouter();

  const deleteMeeting = api.meeting.delete.useMutation({
    onSuccess: () => {
      router.push("/meetings");
      router.refresh();
    },
  });

  const handleDeleteMeeting = () => {
    deleteMeeting.mutate({ id: meeting.id });
  };

  return (
    <Layout>
      <Container>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between ">
            <h2 className="text-3xl font-medium text-zinc-100">
              Meeting {meeting.id}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleDeleteMeeting()}
                variant="primary"
                className="group w-full"
              >
                <span>
                  {deleteMeeting.isLoading ? "Deleting" : "Delete Meeting"}{" "}
                </span>
                {deleteMeeting.isLoading && (
                  <CircleDashed className="h-4 w-4 animate-spin stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
                )}
              </Button>
            </div>
          </div>
          <main>
            <div className="mx-auto mt-4 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                <section>
                  <div className="rounded-lg px-4 py-5 ring-1 ring-white/10">
                    <div className="aspect-video w-full">
                      <video
                        className="h-full w-full object-cover"
                        src={
                          !meeting.hasVideo
                            ? "https://www.w3schools.com/html/mov_bbb.mp4"
                            : `${NEXT_PUBLIC_R2_DOMAIN}/meetings/${bot.id}/video.mp4`
                        }
                        controls
                        muted
                        autoPlay
                      ></video>
                    </div>
                  </div>
                </section>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="lg:col-span-1 lg:col-start-3"
              >
                <div className="rounded-lg px-4 py-5 ring-1 ring-white/10 sm:px-6">
                  <pre className="h-72 overflow-scroll text-teal-500">
                    {JSON.stringify(bot, null, 2)}
                  </pre>
                </div>
              </section>
            </div>
          </main>
        </div>
      </Container>
    </Layout>
  );
}
