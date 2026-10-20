import { cn } from "@/lib/utils"
import Image from "next/image"

interface HomeCardProps {
  img: string,
  title: string,
  description: string,
  handleClick: () => void,
  className: string,
}

export default function HomeCard({ img, title, description, handleClick, className }: HomeCardProps) {
  return (
    <div
      className={cn('flex min-h-65 w-full cursor-pointer flex-col justify-between rounded-[14px] px-4 py-6', className)}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image
          src={img}
          alt={title}
          width={27}
          height={27}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  )
}
