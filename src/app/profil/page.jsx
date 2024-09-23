import React from "react"
import { auth, signOut } from "../auth.ts"
import Image from "next/image"
import { PrismaClient } from "@prisma/client"
import SignIn from "../components/signin"


const prisma = new PrismaClient()
export default async function Profil() {
  const session = await auth()
  if (!session) return <SignIn/>

  // Récupérer les informations utilisateur à partir de Prisma
  const user =
    session && session.user.provider == "google"
      ? await prisma.user.findUnique({
          where: { email: session.user.email }, // Utilisation de l'email comme clé unique
        })
      : await prisma.user.findUnique({
          where: { id: session.user.id }, // Utilisation de l'email comme clé unique
        })

  if (!user) {
    return <p>Utilisateur non trouvé</p>
  }

  // console.log(session)
  // console.log("user ", user)

  return (
    <div className="flex flex-col gap-6 lg:pt-[10rem] items-center">
      <form
        action={async (formData) => {
          "use server"
          await signOut({ redirectTo: "/signin" })
        }}
      >
        <button type="submit">Sign out</button>
      </form>

      <Image
        width={155}
        height={155}
        src={user.image || session.user.image || "/logo.png"}
        alt="User Avatar"
        className="rounded-full"
      />
      <h1> {session.user.name} </h1>
    </div>
  )
}
