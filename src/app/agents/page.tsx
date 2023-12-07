/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Layout } from "~/app/_components/Layout";
import { CircleDashed } from "lucide-react";
import logoAirbnb from "~/images/logos/airbnb.svg";
import logoFacebook from "~/images/logos/facebook.svg";
import logoPlanetaria from "~/images/logos/planetaria.svg";
import logoStarbucks from "~/images/logos/starbucks.svg";
import { Button } from "../_components/Button";
import Image, { type ImageProps } from "next/image";
import { Container } from "../_components/Container";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <Layout>
      <div className="flex flex-col items-center gap-2">
        <AgentDirectory />
      </div>
    </Layout>
  );
}

interface Agent {
  name: string;
  speciality: string;
  logo: ImageProps["src"];
}

function Role({ agent }: { agent: Agent }) {
  return (
    <li className="flex flex-col gap-y-3">
      <div className="flex gap-x-4">
        <div className="w-1/4">
          <div className="relative mt-1 flex aspect-square w-full flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <Image
              src={agent.logo}
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
            {agent.speciality}
          </dd>
        </dl>
      </div>

      <p className="flex-none px-1 text-sm text-zinc-500 dark:text-zinc-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sint
        excepturi sed minima perspiciatis veniam consectetur dicta voluptatum
        obcaecati veritatis fugiat ex eum...
      </p>
    </li>
  );
}

function Agent() {
  const agents: Array<Agent> = [
    {
      name: "Sarah",
      speciality: "CEO",
      logo: logoPlanetaria,
    },
    {
      name: "Zeno",
      speciality: "Product Designer",
      logo: logoAirbnb,
    },
    {
      name: "Daxton",
      speciality: "React Developer",
      logo: logoFacebook,
    },
    {
      name: "Ember",
      speciality: "Illustrator",
      logo: logoStarbucks,
    },
    {
      name: "Siqi",
      speciality: "GTM Strategy",
      logo: logoPlanetaria,
    },
  ];

  return (
    <>
      {agents.map((agent, agentIndex) => (
        <div
          className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
          key={agentIndex}
        >
          <ol className="space-y-4">
            <Role key={agentIndex} agent={agent} />
          </ol>
          <Button href="#" variant="secondary" className="group mt-6 w-full">
            Activate
            <CircleDashed className="h-4 w-4 animate-spin stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          </Button>
        </div>
      ))}
    </>
  );
}

async function AgentDirectory() {
  // const latestPost = await api.post.getLatest.query();

  return (
    <>
      <Container>
        <div className="grid w-full max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          <Agent />
        </div>
      </Container>
    </>
  );
}
