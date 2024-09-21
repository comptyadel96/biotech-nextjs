// "use client"

// import clsx from "clsx"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { MdOutlinePersonOutline, MdSearch } from "react-icons/md"
// import { SlHandbag } from "react-icons/sl"

// export default function Navbar() {
//   const pathName = usePathname()
//   return (
//     <>
//       {/* desktop Navbar */}
//       <div className="flex-col lg:flex hidden  pt-3 gap-5  fixed top-0 z-50 w-full bg-white select-none navbar">
//         <div className="flex items-center gap-4 bg-white w-full px-3">
//           <Image
//             width={150}
//             height={150}
//             src={"/logo.png"}
//             alt="biotech logo"
//           />
//           <p>A propos</p>
//           <p>Le pouvoir de la gelé royale</p>
//           <p>Programme de fidelité</p>
//           <div className="flex items-center gap-3 ml-[8%]">
//             <Link href={"/profil"} className="">
//               <MdOutlinePersonOutline size={28} />
//             </Link>

//             <Link href={"/"}>
//               <SlHandbag size={22} />
//             </Link>
//           </div>

//           {/* search bar */}
//           <div className="flex items-center gap-3 bg-gray-200 rounded-full ml-auto mr-20 pl-3">
//             <MdSearch size={24} />
//             <input
//               type="text"
//               className=" bg-transparent  p-2"
//               placeholder="Chercher un produit"
//             />
//           </div>
//         </div>
//         <div
//           className="lg:flex hidden justify-between w-full py-3 px-8 bg-[#daeadc] "
//           suppressHydrationWarning
//         >
//           {/* links */}
//           <nav className="flex items-center gap-3 font-bold w-full">
//             <Link
//               className={clsx("font-semibold", {
//                 "text-emerald-600": pathName === "/",
//               })}
//               href={"/"}
//             >
//               Accueil
//             </Link>
//             <Link href={"/shop"}>Tous nos produits</Link>
//             <Link href={"/services"}>Vos besoins</Link>
//             <Link href={"/contact"}>Packs</Link>

//             <button className="px-3 py-2 rounded-full text-white bg-black ml-auto mr-10">
//               Trouvez les produits qui vous conviennent
//             </button>
//           </nav>
//         </div>
//       </div>
//     </>
//   )
// }

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
      {/* Desktop Navbar */}
      <div className="flex-col lg:flex hidden pt-3 gap-5 fixed top-0 z-50 w-full bg-white select-none navbar">
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

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-gray-200 rounded-full ml-auto mr-20 pl-3">
            <MdSearch size={24} />
            <input
              type="text"
              className="bg-transparent p-2  focus:outline-none "
              placeholder="Chercher un produit"
            />
          </div>
        </div>
        <div
          className="lg:flex hidden justify-between w-full py-3 px-8 bg-[#daeadc]"
          suppressHydrationWarning
        >
          {/* Links */}
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

            {/* Vos Besoins with dropdown */}
            <div className="relative group">
              <Link href={"/services"}>Vos besoins</Link>

              {/* Dropdown Menu */}
              <div className="absolute justify-between min-w-[60vw] gap-5 left-0  hidden group-hover:flex bg-white shadow-lg rounded-lg px-4 py-8">
                {/* Triangle arrow */}

                <div className="absolute -top-2 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>
                {/* sous menu */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="#"
                    className="block  border-l-2 pl-3 border-l-yellow-500 text-black"
                  >
                    Fatigue
                  </Link>
                  <Link
                    href="#"
                    className="block  border-l-2 pl-3 border-l-yellow-500 text-black"
                  >
                    Système immunitaire
                  </Link>
                  <Link
                    href="#"
                    className="block  border-l-2 pl-3 border-l-yellow-500 text-black"
                  >
                    Concentration, mémoire
                  </Link>
                  <Link
                    href="#"
                    className="block  border-l-2 pl-3 border-l-yellow-500 text-black"
                  >
                    Convalescence et remise en forme
                  </Link>
                  <Link
                    href="#"
                    className="block  border-l-2 pl-3 border-l-yellow-500  text-black"
                  >
                    Problèmes digestifs
                  </Link>
                </div>

                <Image
                  alt="Gelphore boost"
                  src={"/gelphore-boost.png"}
                  width={250}
                  height={250}
                />
              </div>
            </div>

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
