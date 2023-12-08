"use client";

import { useRouter } from "next/navigation";
import { CircleDashed } from "lucide-react";
import logoPlanetaria from "~/images/logos/planetaria.svg";
import { Button } from "./Button";
import Image from "next/image";

import type { Agent } from "@prisma/client";
import { api } from "~/trpc/react";

function AgentCard({ agent }: { agent: Agent }) {
  const router = useRouter();

  const activateAgent = api.agent.activate.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleActivateAgent = (agent: Agent) => {
    activateAgent.mutate({ agentId: agent.id });
  };

  return (
    <div
      className="flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      key={agent.id}
    >
      <ol className="flex-1 space-y-4">
        <AgentInfo agent={agent} />
      </ol>
      <Button
        variant={agent.activated ? "color" : "secondary"}
        className="group mt-6 w-full"
        disabled={agent.activated}
        onClick={() => handleActivateAgent(agent)}
      >
        <span>
          {activateAgent.isLoading
            ? "Activating"
            : agent.activated
              ? "Activated"
              : "Activate"}
        </span>
        {activateAgent.isLoading && (
          <CircleDashed className="h-4 w-4 animate-spin stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        )}
      </Button>
    </div>
  );
}

function AgentInfo({ agent }: { agent: Agent }) {
  return (
    <li className="flex flex-col gap-y-3">
      <div className="flex gap-x-4">
        <div className="w-1/4">
          <div className="relative mt-1 flex aspect-square w-full flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <Image
              src={logoPlanetaria}
              alt=""
              className="aspect-square w-5/6"
              unoptimized
            />
          </div>
        </div>
        <dl className="flex w-3/4 flex-wrap gap-x-2 py-3">
          <dt className="sr-only">Name</dt>
          <dd className="w-full flex-none text-lg font-medium leading-none text-zinc-900 dark:text-zinc-100">
            {agent.name}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {agent.role}
          </dd>
        </dl>
      </div>
      <p className="flex-none px-1 text-sm text-zinc-500 dark:text-zinc-400">
        {agent.description}
      </p>
    </li>
  );
}

export function Agents({ agents }: { agents: Array<Agent> }) {
  return (
    <>
      {agents.map((agent, agentIndex) => (
        <AgentCard key={agentIndex} agent={agent} />
      ))}
    </>
  );
}
