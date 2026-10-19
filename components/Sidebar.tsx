"use client"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function Sidebar() {
  const pathName = usePathname()

  return (
    <section className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-popover p-6 pt-28 max-sm:hidden lg:w-66">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathName === link.route || pathName.startsWith(`${link.route}/`)

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex items-center justify-start gap-4 rounded-lg p-4",
                {
                  "bg-sidebar-primary": isActive,
                }
              )}
            >
                <Image
                    src={link.imgUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                    {link.label}
                </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
