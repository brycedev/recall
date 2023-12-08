import { Layout } from "~/app/_components/Layout";
import { api } from "~/trpc/server";
import { Container } from "~/app/_components/Container";
import { Agents } from "~/app/_components/Agents";

export async function AgentDirectory() {
  const agents = await api.agent.getAll.query();

  return (
    <Container>
      <div className="grid w-full max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
        <Agents agents={agents} />
      </div>
    </Container>
  );
}

export default async function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-2">
        <AgentDirectory />
      </div>
    </Layout>
  );
}
