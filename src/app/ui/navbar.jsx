"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathName = usePathname()
  return (
    <>
      {/* desktop Navbar */}
      <div
        className="flex justify-between w-full lg:p-6 bg-red-50 shadow-md"
        suppressHydrationWarning
      >
        {/* logo */}

        {/* links */}
        <nav className="flex items-center gap-3">
          <Link
            className={clsx("font-semibold", {
              "text-red-600": pathName === "/",
            })}
            href={"/"}
          >
            Accueil
          </Link>
          <Link href={"/shop"}>Shop</Link>
          <Link href={"/services"}>Services</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>
      </div>
    </>
  )
}
