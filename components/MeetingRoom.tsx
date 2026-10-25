import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

export default function MeetingRoom() {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get("personal")
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />

  function CallLayout() {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-250 items-center">
          <CallLayout />
        </div>
        <div
          className={cn("ml-2 hidden h-[calc(100vh-86px)]", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5">
        <CallControls onLeave={() => {router.push('/')}} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger
              render={<Button variant="outline" />}
              className="cursor-pointer rounded-2xl px-4 py-2"
            >
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl px-4 py-2">
            <Users size={20} />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}
