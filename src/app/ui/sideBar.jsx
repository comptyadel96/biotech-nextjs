"use client"
import Link from "next/link"

function SideBar() {
  return (
    <div className="flex flex-col gap-5 lg:min-w-[20%] sticky top-0  p-5 bg-white shadow">
      <h2 className="font-semibold lg:text-2xl">SideBar</h2>
      <Link href="/">Accueil</Link>
      <p>option2</p>
      <p>option3</p>
      <p>option4</p>
    </div>
  )
}

export default SideBar
