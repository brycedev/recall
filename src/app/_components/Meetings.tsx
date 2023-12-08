"use client";

import { Layout } from "~/app/_components/Layout";
import { Container } from "~/app/_components/Container";
import { Button } from "../_components/Button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import clsx from "clsx";
import { type Meeting } from "@prisma/client";
import { CircleDashed, Eye, Play } from "lucide-react";
import Link from "next/link";

export default function Meetings({ meetings }: { meetings: Meeting[] }) {
  const router = useRouter();

  const createMeeting = api.meeting.create.useMutation({
    onSuccess: ({ zoomUrl }) => {
      router.refresh();
      // open zoom link automatically
      const win = window.open(zoomUrl, "_blank");
      win.focus();
    },
  });

  const handleCreateMeeting = () => {
    createMeeting.mutate();
  };

  return (
    <Layout>
      <Container>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-medium text-zinc-100">Meetings</h2>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleCreateMeeting()}
                variant="primary"
                className="group w-full"
              >
                <span>
                  {createMeeting.isLoading ? "Starting" : "Start Meeting"}{" "}
                </span>
                {createMeeting.isLoading && (
                  <CircleDashed className="h-4 w-4 animate-spin stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
                )}
              </Button>
            </div>
          </div>
          <div className="mt-6">
            {meetings.map((meeting) => (
              <table
                className="mt-6 w-full whitespace-nowrap rounded-md text-left ring-1 ring-white/10"
                key={meeting.id}
              >
                <colgroup>
                  <col className="w-full sm:w-4/12" />
                  <col className="lg:w-4/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-sm leading-6 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-medium sm:pl-6 lg:pl-8"
                    >
                      ID - {meeting.id}
                    </th>

                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-medium sm:pr-8 sm:text-left lg:pr-20"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-medium md:table-cell lg:pr-20"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-medium sm:table-cell sm:pr-6 lg:pr-8"
                    >
                      Initiated
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-medium sm:table-cell sm:pr-6 lg:pr-8"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 transition hover:bg-teal-500">
                          <Play className="h-6 w-6 pl-1 text-white" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <div
                          className={clsx(
                            meeting.active
                              ? "animate-pulse bg-teal-400/10 text-teal-400"
                              : "bg-green-400/10 text-green-400",
                            "flex-none rounded-full p-1",
                          )}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <div className="hidden text-white sm:block">
                          {meeting.active ? "In Session" : "Completed"}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                      {meeting.duration}
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                      <p>{meeting.created.toUTCString()}</p>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                      <Link href={`/meetings/${meeting.id}`}>
                        <Button>
                          <Eye className="h-5 w-5 text-white hover:text-white/90" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
