import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { Show, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav className='flex flex-between fixed z-50 w-full px-6 py-4 lg:px-10 bg-popover'>
        <Link href='/' className='flex items-center gap-1'>
            <Image 
                src="/icons/logo.svg"
                alt='Logo'
                width={32}
                height={32}
            />
            <p className='text-[26px] font-extrabold max-sm:hidden'>My Meeting</p>
        </Link>

        <div className='flex flex-between gap-5'>
            <Show when="signed-in">
                <UserButton />
            </Show>

            <MobileNav />
        </div>
    </nav>
  )
}
