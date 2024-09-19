"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdOutlinePersonOutline, MdSearch } from "react-icons/md"
import { SlHandbag } from "react-icons/sl"

export default function Navbar() {
  const pathName = usePathname()
  return (
    <>
      {/* desktop Navbar */}
      <div className="flex-col lg:flex hidden  pt-3 gap-5  fixed top-0 z-50 w-full bg-white select-none navbar">
        <div className="flex items-center gap-4 bg-white w-full px-3">
          <Image
            width={150}
            height={150}
            src={"/logo.png"}
            alt="biotech logo"
          />
          <p>A propos</p>
          <p>Le pouvoir de la gelé royale</p>
          <p>Programme de fidelité</p>
          <div className="flex items-center gap-3 ml-[8%]">
            <Link href={"/profil"} className="">
              <MdOutlinePersonOutline size={28} />
            </Link>

            <Link href={"/"}>
              <SlHandbag size={22} />
            </Link>
          </div>

          {/* search bar */}
          <div className="flex items-center gap-3 bg-gray-200 rounded-full ml-auto mr-20 pl-3">
            <MdSearch size={24} />
            <input
              type="text"
              className=" bg-transparent  p-2"
              placeholder="Chercher un produit"
            />
          </div>
        </div>
        <div
          className="lg:flex hidden justify-between w-full py-3 px-8 bg-[#daeadc] "
          suppressHydrationWarning
        >
          {/* links */}
          <nav className="flex items-center gap-3 font-bold w-full">
            <Link
              className={clsx("font-semibold", {
                "text-emerald-600": pathName === "/",
              })}
              href={"/"}
            >
              Accueil
            </Link>
            <Link href={"/shop"}>Tous nos produits</Link>
            <Link href={"/services"}>Vos besoins</Link>
            <Link href={"/contact"}>Packs</Link>

            <button className="px-3 py-2 rounded-full text-white bg-black ml-auto mr-10">
              Trouvez les produits qui vous conviennent
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
