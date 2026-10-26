"use client"

import { useRouter } from "next/navigation"
import HomeCard from "./HomeCard"
import { useState } from "react"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "@/components/ui/toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from "react-datepicker"
import { Input } from "./ui/input"

export default function MeetingTypeList() {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })
  const [callDetails, setCallDetails] = useState<Call>()

  async function createMeeting() {
    if (!client || !user) return

    try {
      if (!values.dateTime) {
        toast.add({ title: "Please select a date and time for the meeting" })
        return
      }

      const id = crypto.randomUUID()

      const call = client.call("default", id)

      if (!call) throw new Error("Failed to create call")

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant meeting"

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })

      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast.add({
        title: "Meeting created successfully",
      })
    } catch (error) {
      console.log(error)
      toast.add({
        title: "Failed to create meeting",
      })
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-400"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-500"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="View your past meetings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-500"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join an existing meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-400"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-normal text-base leading-5.5">
              Add a description
            </label>
            <Textarea
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-normal text-base leading-5.5">
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="d MMMM yyyy, HH:mm"
              className="w-full rounded bg-accent p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast.add({ title: "Link Copied" })
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the meeting link to join"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting Link"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  )
}
