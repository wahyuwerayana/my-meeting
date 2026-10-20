import MeetingTypeList from "@/components/MeetingTypeList"

export default function Home() {
  const now = new Date()

  const time = now.toLocaleTimeString("en-ID", {
    hour: "2-digit",
    minute: "numeric",
  })
  const date = now.toLocaleDateString("en-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-3xl font-bold">
        <div className="h-75 w-full rounded-[20px] bg-hero bg-cover">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            <h2 className="glassmorphism max-w-67.5 rounded py-2 text-center text-base font-normal">
              Upcoming Meeting at: 12:30 PM
            </h2>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-lg font-medium text-muted-foreground lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>
      </h1>

      <MeetingTypeList />
    </section>
  )
}
