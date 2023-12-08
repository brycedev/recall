-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "zoomId" TEXT,
    "recallId" TEXT,
    "zoomUrl" TEXT NOT NULL,
    "hasVideo" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER DEFAULT 0,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AgentToMeeting" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_zoomId_key" ON "Meeting"("zoomId");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_recallId_key" ON "Meeting"("recallId");

-- CreateIndex
CREATE UNIQUE INDEX "_AgentToMeeting_AB_unique" ON "_AgentToMeeting"("A", "B");

-- CreateIndex
CREATE INDEX "_AgentToMeeting_B_index" ON "_AgentToMeeting"("B");

-- AddForeignKey
ALTER TABLE "_AgentToMeeting" ADD CONSTRAINT "_AgentToMeeting_A_fkey" FOREIGN KEY ("A") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgentToMeeting" ADD CONSTRAINT "_AgentToMeeting_B_fkey" FOREIGN KEY ("B") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
