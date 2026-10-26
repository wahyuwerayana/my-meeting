"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const pathName = usePathname()

  return (
    <section className="w-full max-w-66">
      <Sheet>
        <SheetTrigger
          render={
            <button className="cursor-pointer sm:hidden">
              <Image
                src="/icons/hamburger.svg"
                alt="Open Menu"
                width={36}
                height={36}
              />
            </button>
          }
        />

        <SheetContent side="left" className="border-none p-2.5">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/icons/logo.svg" alt="Logo" width={32} height={32} />
            <p className="text-[26px] font-extrabold">My Meeting</p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16">
              {sidebarLinks.map((link) => {
                const isActive = pathName === link.route

                return (
                  <SheetClose
                    key={link.route}
                    render={
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex w-full max-w-60 items-center gap-4 rounded-lg p-4",
                          {
                            "bg-sidebar-primary": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    }
                  />
                )
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
