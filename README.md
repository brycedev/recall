<h1 align="center"><b>Recall.ai Starter</b></h1>

*stbl is a simple demo application showcasing some of the functionality of the Recall.ai API. It is built using the [Next.js](https://nextjs.org/) framework alongside tRPC, Prisma, Cloudflare, and can easily be deployed on [Vercel](https://vercel.com/).*


<p align="center">
    <img
        src="https://recall.bryce.id/readme_header.png"
        alt="Recall Starter Screenshot"
        width="100%"
      />
</p>


<p align="center">
<img alt="Commit activity per month" src="https://img.shields.io/github/commit-activity/m/brycedev/recall?label=Commits&style=for-the-badge&color=166CF9" />
<img alt="Discord online members" src="https://img.shields.io/discord/1150900319560155227?color=166CF9&label=Discord&style=for-the-badge" />
<img alt="GitHub" src="https://img.shields.io/github/license/brycedev/recall?style=for-the-badge&color=166CF9">

</p>




## Features

- **Create Meeting**: Create an on-demand Zoom meeting that can be joined by your startup "team members".
- **Create Bot**: Create a Recall.ai bot that can connect to a Zoom meeting and automatically record the meeting. 
- **Delete Bot**: Delete a bot that may currently be connected to a Zoom meeting.
- **Webhook Handler**: Handle webhooks from Recall.ai without needing to run an additonal backend. Currently reacting to ```call_ended``` and ```done``` status codes on ```bot.status_change``` events.
- **Video Download**: Download the video of the meeting as an MP4 file, once the video session has been processed by Recall.ai.
- **View Recording**: View recordings of your meetings and see the transcript of the meeting.
- **Fetch Bot**: Fetch a bot from the Recall.ai API and display its contents.

## Getting Started (Local)

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [NPM](https://www.npmjs.com/) (v7 or higher)
- PostgreSQL
- SVIX CLI (for testing webhooks locally)
- Cloudflare Account or S3 Provider (for file storage)
- [Zoom Server-to-Server App](https://developers.zoom.us/docs/internal-apps/create/) (for creating meetings) 

### Installation

1. Clone the repo
   
   ```sh
   git clone https://github.com/brycedev/recall.git
2. Go to the project folder

   ```sh
   cd recall
   ```
3. Install packages with npm or bun

   ```sh
   npm install
   bun install
   ```
4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Fill in your Recall API Key
   - Fill in your Zoom developer credentials
   - Fill in the Cloudflare R2 credentials (S3 credentials can be used where you see ```R2```)
   - Configure NEXT_PUBLIC_R2_DOMAIN= publicly accessible domain for your R2/S3 bucket
5. Run the DB migrations and seed the DB

   ```sh
   npx prisma migrate dev --name init
   npx prisma db seed --preview-feature
   ```

### Running the app

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

### Testing webhooks locally

1. Install the SVIX CLI - https://github.com/svix/svix-cli
2. Authenticate the CLI with your SVIX account
3. Run the following command to start a local webhook server

   ```sh
   npm run recall:listen
   ```
4. You should now see a webhook URL in your terminal. Copy this URL and use it to create a webhook in your Recall.ai account.