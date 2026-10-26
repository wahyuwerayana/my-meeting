"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import React from "react"

function Table({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row min-w-0 w-full">
      <h1 className="text-base font-medium lg:text-xl xl:min-w-32">{title}:</h1>
      <h1 className="break-all text-sm font-bold lg:text-xl">
        {description}
      </h1>
    </div>
  )
}

export default function PersonalRoom() {
  const { user } = useUser()
  const meetingID = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`
  const { call } = useGetCallById(meetingID!)
  const client = useStreamVideoClient()
  const router = useRouter()

  async function startRoom() {
    if (!client || !user) return

    if (!call) {
      const newCall = client.call("default", meetingID!)

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      })
    }

    router.push(`/meeting/${meetingID}?personal=true`)
  }

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-225">
        <Table title="Topic" description={`${user?.username}'s meeting room`} />
        <Table title="Meeting ID" description={`${meetingID}`} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      <div className="flex gap-5">
        <Button className="bg-primary" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-accent"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast.add({ title: "Link copied" })
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}
