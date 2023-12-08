/* 
  This is our seeder file that we will use to add some initial data to the database. 
  We will focus on adding some agents to the database so that we can select them in the UI.
*/

import { db } from "~/server/db";

async function main() {
  await db.agent.createMany({
    data: [
      {
        name: "Sarah",
        role: "Full Stack Developer",
        description:
          "Full stack developer, with a focus on React, TailwindCSS, and Django.",
      },
      {
        name: "Zeno",
        role: "Content Writer",
        description:
          "Content and technical writer with expert knowledge of SEO and marketing.",
      },
      {
        name: "Daxton",
        role: "React Developer",
        description:
          "React developer with a focus on TypeScript. Misses the good ol' CoffeeScript days.",
      },
      {
        name: "Ember",
        role: "Graphic Designer",
        description:
          "Graphic designer and occasional front-end developer. Does not miss the good ol' Macromedia days.",
      },
      {
        name: "Erlich",
        role: "Intern",
        description:
          "Intern who is interested in incubators, capital burn, and team morale.",
      },
      {
        name: "Siqi",
        role: "GTM Strategy",
        description: "Go to market strategy and product marketing.",
      },
      {
        name: "Willow",
        role: "Product Manager",
        description:
          "Product manager with a focus on user experience and just generally, crushing it.",
      },
    ],
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
